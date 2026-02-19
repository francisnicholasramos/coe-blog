import { useParams } from "react-router";
import { useFetchBlogById } from "../../../hooks/useFetchBlogs";
import { helpers } from "../../../utils/helpers";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoSendSharp } from "react-icons/io5";

const PostDetail = () => {
    const { username, postId } = useParams<{ username: string; postId: string }>();
    const { post, loading, error } = useFetchBlogById(username || '', postId || '');
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading post</h2>
                    <p className="text-gray-600">{error || 'Post not found'}</p>
                </div>
            </div>
        );
    }
    return (
        <article className="max-w-4xl mx-auto py-12 ">
            {/* title */}
            <header>
                <h1 className="text-4xl mb-7 font-bold">
                    {post.title} 
                </h1>

            {/* metadata */}
            <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
                    {post.user?.username?.charAt(0).toUpperCase() || username?.charAt(1).toUpperCase()}
                </div>
                <div className="flex items-center space-x-3">
                    <div className="font-medium text-gray-900">
                        {post.user?.username || username?.substring(1)}
                    </div>
                    <time className="text-sm space-x-3 text-gray-500">
                        <span>{helpers.calculateReadTime(post.content)}</span>
                        <span>·</span>
                        <time>{helpers.formatDate(post.createdAt)}</time>
                    </time>
                </div>
            </div>
            </header>

            {/* content */}
            <section className="prose mb-6 text-gray-700">
                {post.content}
            </section>

            {/* comments  */}
            <section>
                <h2 className="text-gray-800 text-2xl font-semibold mb-6">
                    Comments 
                    {post.comments?.length ? ` (${post.comments.length})` : ''}
                </h2>

                {/* comment form */}
                {/* <div className="mb-8"> */}
                {/*     <textarea */}
                {/*         className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" */}
                {/*         rows={1} */}
                {/*         placeholder="Write a comment..." */}
                {/*     /> */}
                {/*     <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"> */}
                {/*         Post Comment */}
                {/*     </button> */}
                {/* </div> */}

                <TextField
                    fullWidth
                    multiline
                    rows={1}
                    sx={{ mb: 3 }}
                    placeholder="Write a comment..."
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IoSendSharp />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

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
        </article>
    );
};

export default PostDetail;
