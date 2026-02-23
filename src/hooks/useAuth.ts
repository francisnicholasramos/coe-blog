import { useState, useEffect } from 'react';
export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
                    credentials: 'include',  // Important: sends the httpOnly cookie
                });
                if (res.ok) {
                    const data = await res.json();
                    setIsAuthenticated(true);
                    setUser(data.user);
                }
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);
    return { isAuthenticated, user, loading };
}
