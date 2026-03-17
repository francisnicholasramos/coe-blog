import {Link} from "react-router-dom";
import type { PostCardProps } from "../../../types";
import {helpers} from '../../../utils/helpers';
import {Skeleton} from "@heroui/react";
import {Avatar} from "@heroui/react";
import { useLike } from "../../../hooks/useLike";

const PostCard = ({ post, loading }: PostCardProps) => {
    const { likesCount } = useLike(post.id);
    if (loading) {
        return (
            <div className="py-6">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-48" />
            </div>
        );
    }

    return (
        <Link to={`/@${post.user?.username}/${post.id}`}>
        <article className="flex flex-col sm:flex-row items-start justify-between py-6 border-gray-500 last:border-b-0">
            <div className="flex-1 pr-0 sm:pr-8">
                {/* author */}
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

                {/* title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight hover:text-gray-600 cursor-pointer transition-colors">
                    {post.title}
                </h2>

                {/* Preview Content - Shows first 150 characters with ... if longer */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                    {helpers.formatText(post.content).substring(0, 150)}
                    {post.content.length > 150 ? '...' : ''}
                </p>

                {/* metadata */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <time>{helpers.formatDate(new Date(post.createdAt))}</time>
                    <span>·</span>
                    <span>{helpers.calculateReadTime(post.content)}</span>

                    {(likesCount > 0 || (post.comments && post.comments.length > 0)) && (
                        <span>·</span>
                    )}

                    {likesCount > 0 && (
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="none"
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
                        {likesCount > 0 && <span>{likesCount}</span>}
                    </div>
                    )}

                    {/* comment count */}
                    {post.comments && post.comments.length > 0 && (
                        <>
                            <div className="flex items-center space-x-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                <span>{post.comments.length}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* thumbnail */}
            {/*  <div className="mt-4 sm:mt-0 flex-shrink-0"> */}
            {/*      <div className="w-full sm:w-32 h-20 sm:h-20 bg-gray-100 rounded-lg flex items-center justify-center"> */}
            {/*          <svg */}
            {/*              className="w-8 h-8 text-gray-300" */}
            {/*              fill="none" */}
            {/*              stroke="currentColor" */}
            {/*              viewBox="0 0 24 24">*/}
            {/*              <path */}
            {/*                  strokeLinecap="round" */}
            {/*                  strokeLinejoin="round" */}
            {/*                  strokeWidth={1.5} */}
            {/*                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" */}
            {/*              /> */}
            {/*          </svg> */}
            {/*      </div> */}
            {/*  </div>  */}

        </article>
        </Link>
    );
}

export default PostCard;
