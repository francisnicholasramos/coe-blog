const API_URL = `${import.meta.env.VITE_API_URL}`;

async function refreshToken(): Promise<boolean> {
    try {
        const res = await fetch(`${API_URL}/refresh-token`, {
            method: 'POST',
            credentials: 'include'
        })
        return res.ok;
    } catch {
        return false;
    }

}

export async function apiFetch(
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> {
    const config: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
    };

    let res = await fetch(`${API_URL}${endpoint}`, config);

    if (res.status === 401) {
        const data = await res.json();
        
        if (data.refreshable) {
            const refreshed = await refreshToken();

            if (refreshed) {
                await new Promise(r => setTimeout(r)); 
                res = await fetch(`${API_URL}${endpoint}`, config);
            } else {
                window.location.href = '/login';
            }
        }
    }

    return res;
}


