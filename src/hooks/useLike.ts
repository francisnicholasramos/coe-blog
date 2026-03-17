import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../utils/api";

export const useLike = (postId: string) => {
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLikesCount = useCallback(async () => {
        try {
            const res = await apiFetch(`/likes/${postId}`);
            if (res.ok) {
                const data = await res.json();
                setLikesCount(data.likesCount);
                setIsLiked(data.liked);
            }
        } catch (err) {
            console.error(err);
        }
    }, [postId]);

    const toggleLike = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const res = await apiFetch(`/likes/${postId}`, {
                method: "POST",
            });
            if (res.ok) {
                fetchLikesCount();
            } else if (res.status === 401) {
                window.location.href = "/login";
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [postId, isLoading, fetchLikesCount]);

    useEffect(() => {
        fetchLikesCount();
    }, [fetchLikesCount]);

    return {
        likesCount,
        isLiked,
        isLoading,
        toggleLike,
        refetch: fetchLikesCount,
    };
};
