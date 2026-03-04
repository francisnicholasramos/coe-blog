import type {Post} from "../../types";
import {helpers} from "../../utils/helpers";

const CommentSection = ({post}: {post: Post}) => {
    return (
        <section>
            {post.comments && post.comments.length > 0 ? (
                <div className="space-y-6">
                    {post.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                                {comment.user?.username?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium text-gray-900">
                                        {comment.user?.username || comment.username || 'Anonymous'}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {helpers.formatDate(comment.createdAt)}
                                    </span>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-4">
                    No comments yet. Be the first to share your thoughts!
                </p>
            )}
        </section>
    )
}

export default CommentSection

