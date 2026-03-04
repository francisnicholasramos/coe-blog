import {useState, useEffect} from "react";
import {apiFetch} from "../../../utils/api";
import type {Post} from "../../../types"

export function usePrivateSearch(query: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        try {
            setLoading(true)
            setError(null)
            
            const res = await apiFetch(`/me/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();

            setPosts(data.results || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (query) {
            search(query);
        } else {
            setPosts([]);
        } 
    }, [query]);

    return {posts, loading, error, search};
}
