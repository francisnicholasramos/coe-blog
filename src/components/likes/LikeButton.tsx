import { useLike } from "../../hooks/useLike";

interface LikeButtonProps {
    postId: string;
    size?: "sm" | "md";
}

export const LikeButton = ({ postId, size = "sm" }: LikeButtonProps) => {
    const { likesCount, isLiked, isLoading, toggleLike } = useLike(postId);

    const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    const textSize = size === "sm" ? "text-sm" : "text-base";
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoading) {
            toggleLike();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`flex items-center space-x-1 transition-colors ${
                isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
            <svg
                className={iconSize}
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            {likesCount > 0 && <span className={textSize}>{likesCount}</span>}
        </button>
    );
};
