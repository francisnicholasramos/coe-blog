import { useState, useEffect } from 'react';
import {apiFetch} from "../utils/api";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiFetch('/me');
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
