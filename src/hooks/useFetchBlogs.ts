import { useState, useEffect } from 'react';
import type { Post } from '../types';

interface PublicBlogsResponse {
  publicBlogs: Post[];
}

interface UseFetchBlogsReturn {
    blogs: Post[];         
    loading: boolean;      
    error: string | null;  
}

async function getPublicBlogs(): Promise<Post[]> {
    const response = await fetch(import.meta.env.VITE_API_URL, {
        headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PublicBlogsResponse = await response.json();
    return data.publicBlogs;
}

export function useFetchBlogs(): UseFetchBlogsReturn {
    const [blogs, setBlogs] = useState<Post[]>([]);          
    const [loading, setLoading] = useState(true);            
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setLoading(true);
                setError(null);
                const data = await getPublicBlogs();
                setBlogs(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
}
