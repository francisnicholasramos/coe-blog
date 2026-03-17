import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import LikedPostCard from "./LikedPostCard";

interface LikedPost {
    id: string;
    userId: string;
    postId: string;
    post: {
        id: string;
        title: string;
        content: string;
        published: boolean;
        createdAt: string;
        userId: string;
        user?: {
            username: string;
            avatar?: string;
        };
    };
}

const LikedPosts = () => {
    const [posts, setPosts] = useState<LikedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await apiFetch("/liked-posts");
                const data = await res.json();
                setPosts(data.likedPosts || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch liked posts");
            } finally {
                setLoading(false);
            }
        };

        fetchLikedPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-2">
                {[1, 2, 3].map((i) => (
                    <LikedPostCard key={i} likedPost={{} as LikedPost} loading={true} />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No liked posts yet</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            {posts.map((likedPost) => (
                <LikedPostCard key={likedPost.id} likedPost={likedPost} loading={false} />
            ))}
        </div>
    );
};

export default LikedPosts;
