import { useState, useCallback } from 'react';

export interface Post {
    id: string;
    user: {
        username: string
    };
    title: string;
    content: string;
    createdAt: string;
}

export interface CardProps {
    posts: Post[];
    isLoading: boolean;
    error: string;
}

interface UsePostsReturn {
    posts: Post[];
    isLoading: boolean;
    error: string;
    fetchPosts: () => Promise<void>;
    getPostById: (postId: string, username: string) => Promise<boolean>;
    createPost: (title: string, content: string) => Promise<boolean>;
    updatePost: (postId: string, title: string, content: string) => Promise<boolean>;
    deletePost: (postId: string) => Promise<boolean>;
}

export function usePosts(): UsePostsReturn {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    {/* get all blog posts */}
    const fetchPosts = useCallback(async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });

            if (response.status === 401 || response.status === 403) {
                window.location.href = '/login';
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(Array.isArray(data.blogs) ? data.blogs : []);
        } catch {
            setError('Failed to load posts');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getPostById = useCallback(async (postId: string, username: string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${username}/${postId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            });

            if (!res.ok) {
                const error = await res.json();
                setError(error.message);
                return false;
            }

            await fetchPosts();
            return true;
        } catch {
            setError('Something went wrong.');
            return false;
        }
    }, [fetchPosts]);

    const createPost = useCallback(async (title: string, content: string): Promise<boolean> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Failed to create post');
                return false;
            }

            await fetchPosts();
            return true;
        } catch {
            setError('Failed to create post');
            return false;
        }
    }, [fetchPosts]);

    const updatePost = useCallback(async (postId: string, title: string, content: string): Promise<boolean> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Failed to update post');
                return false;
            }

            await fetchPosts();
            return true;
        } catch {
            setError('Failed to update post');
            return false;
        }
    }, [fetchPosts]);

    const deletePost = useCallback(async (postId: string): Promise<boolean> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || 'Failed to delete post');
                return false;
            }

            await fetchPosts();
            return true;
        } catch {
            setError('Failed to delete post');
            return false;
        }
    }, [fetchPosts]);

    return {
        posts,
        isLoading,
        error,
        fetchPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost,
    };
}
