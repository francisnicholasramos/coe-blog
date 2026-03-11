import { useParams } from "react-router";
import { useFetchBlogById } from "../../../hooks/useFetchBlogs"; 
import { helpers } from "../../../utils/helpers";
import Comments from "../../comments/Comments";
import CommentSection  from "../../comments/CommentSection";
import {Avatar} from "@heroui/react";

const PostDetail = () => {
    const { username, postId } = useParams<{ username: string; postId: string }>();
    const { post, loading, error, refetch } = useFetchBlogById(username || '', postId || '');

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        );
    }
    if (error || !post) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong.</h2>
                    <p className="text-gray-600">{error || 'Post not found'}</p>
                </div>
            </div>
        );
    }
    return (
        <article className="w-full max-w-4xl mx-auto py-12 px-3">
            {/* title */}
            <header>
                <h1 className="text-4xl mb-7 font-bold">
                    {post.title} 
                </h1>

            {/* metadata */}
            <div className="flex flex-col-reverse items-start gap-2 space-x-3 mb-6 sm:flex-row sm:items-center">
                <div className="flex items-center space-x-3">
                    <Avatar
                        showFallback
                        name={post.user.username.charAt(0).toUpperCase()}
                        className="text-gray-600 text-sm"
                        src={post.user.avatar}
                    />
                    <div className="font-medium text-gray-700">
                        {post.user?.username || username?.substring(1)}
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <time className="text-sm space-x-3 text-gray-500">
                        <span>{helpers.calculateReadTime(post.content)}</span>
                        <span>·</span>
                        <time>{helpers.formatDate(new Date(post.createdAt))}</time>
                    </time>
                </div>
            </div>
            </header>

            {/* content */}
            <section 
                className="whitespace-pre-wrap mb-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: helpers.formatText(post.content, true) }}
            />

            {/* comments  */}
            <Comments 
                postId={postId || ''}
                post={post}
                refetch={refetch}
            />

            <CommentSection 
                post={post}
                refetch={refetch}
            />
        </article>
    );
};

export default PostDetail;
