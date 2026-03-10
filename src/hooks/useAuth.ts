import { useState, useEffect } from 'react';
import {apiFetch} from "../utils/api";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ id: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiFetch('/me');
                if (res.ok) {
                    const getUser = await apiFetch('/user/me');
                    const data = await getUser.json();
                    setUser(data.user)
                    setIsAuthenticated(true);
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
