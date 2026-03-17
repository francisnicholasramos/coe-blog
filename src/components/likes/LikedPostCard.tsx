import { Link } from "react-router-dom";
import { helpers } from "../../utils/helpers";
import {Avatar} from "@heroui/react";

interface LikedPostData {
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
}

interface LikedPost {
    id: string;
    userId: string;
    postId: string;
    post: LikedPostData;
}

interface LikedPostCardProps {
    likedPost: LikedPost;
    loading?: boolean;
}

const LikedPostCard = ({ likedPost, loading }: LikedPostCardProps) => {
    if (loading) {
        return (
            <div className="py-6">
                <div className="h-4 w-32 mb-2 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-3/4 mb-2 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
        );
    }

    const post = likedPost.post;

    return (
        <Link to={`/@${post.user?.username}/${post.id}`}>
            <article className="flex flex-col sm:flex-row items-start justify-between py-6 border-b border-gray-200 last:border-b-0">
                <div className="flex-1 pr-0 sm:pr-8">
                    {post.user && (
                        <div className="flex items-center space-x-2 mb-2">
                            <Avatar
                                showFallback
                                name={post.user.username.charAt(0).toUpperCase()}
                                className="text-gray-600 text-sm"
                                src={post.user.avatar}
                            />
                            <span className="text-sm text-gray-900 font-medium">
                                {post.user.username}
                            </span>
                        </div>
                    )}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight hover:text-gray-600 cursor-pointer transition-colors">
                        {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {helpers.formatText(post.content || "").substring(0, 150)}
                        {(post.content?.length || 0) > 150 ? "..." : ""}
                    </p>

                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <time>{helpers.formatDate(new Date(post.createdAt))}</time>
                        <span>·</span>
                        <span>{helpers.calculateReadTime(post.content || "")}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default LikedPostCard;
