import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { formatDate } from "../utils/formatDate";
import { Switch } from "@heroui/react";
import TinyMCE from "../../editor/TinyMCE";

interface PostData {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: string;
    user: {
        username: string;
    };
    comments: Array<{
        id: string;
        content: string;
        createdAt: string;
        user: {
            username: string;
        }
    }>;
}

const PostAction = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<PostData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isPublic, setIsPublic] = useState(false);

    // Delete state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                console.log('res', res)

                if (!res.ok) {
                    const errorData = await res.json();
                    setError(errorData.message || 'Post not found');
                    return;
                }

                const data = await res.json();
                setPost(data.post);
                setIsPublic(data.post.published);
            } catch {
                setError('Failed to load post');
            } finally {
                setIsLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId, API_URL]);

    const handleEdit = () => {
        if (post) {
            setEditTitle(post.title);
            setEditContent(post.content);
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditTitle('');
        setEditContent('');
    };

    const handleSave = async () => {
        const textOnly = editContent.replace(/<[^>]*>/g, '').trim();
        if (!editTitle.trim() || !textOnly) {
            setError('Title and content are required');
            return;
        }

        setIsSaving(true);
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    title: editTitle, 
                    content: editContent,
                    published: isPublic
                }),
            });

            if (res.ok) {
                setPost({ ...post!, title: editTitle, content: editContent });
                setIsEditing(false);
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to update post');
            }
        } catch {
            setError('Failed to update post');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (res.ok) {
                navigate('/dashboard');
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to delete post');
                setShowDeleteConfirm(false);
            }
        } catch {
            setError('Failed to delete post');
            setShowDeleteConfirm(false);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-zinc-500 dark:text-zinc-400">Loading post...</p>
            </div>
        );
    }

    if (error && !post) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 text-blue-600 hover:underline"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <p className="text-zinc-500">Post not found</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center w-full min-w-xs max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/dashboard')}
                className="mb-6 text-gray-400 cursor-pointer hover:underline flex items-center gap-2"
            >
                ← Back to Dashboard
            </button>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            Delete Post
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            Are you sure you want to delete this post? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <article className="bg-white min-w-full dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
                {/* Header with Edit/Delete buttons */}
                <div className="flex justify-between items-start mb-6">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 outline-none w-full"
                            placeholder="Post title"
                        />
                    ) : (
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                            {post.title}
                        </h1>
                    )}

                    {!isEditing && (
                        <div className="flex gap-2 ml-4">
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-3 py-1.5 cursor-pointer text-sm text-red-400 hover:underline transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-3 py-1.5 cursor-pointer text-sm text-zinc-600 dark:text-zinc-400 hover:underline transition-colors"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-6 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>@{post.user.username}</span>
                    <span>•</span>
                    <time>{formatDate(new Date(post.createdAt))}</time>
                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* Content - Editable or View */}
                {isEditing ? (
                    <div className="mb-8">
                        <TinyMCE 
                            value={editContent}
                            onChange={(content) => setEditContent(content)}
                        />
                    </div>
                ) : (
                    <div 
                        className="prose dark:prose-invert max-w-none mb-8 text-zinc-700 dark:text-zinc-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                )}



                {/* Edit Actions */}
                {isEditing && (
                    <div className="flex justify-end gap-3 mb-8">
                        <div className="flex items-center gap-2">
                            <Switch
                                isSelected={isPublic}
                                onValueChange={setIsPublic}
                                color="success"
                                size="sm"
                            />
                            <span className="text-sm text-zinc-500">
                                {isPublic ? "Public" : "Private"}
                            </span>
                        </div>
                        <button
                            onClick={handleCancelEdit}
                            disabled={isSaving}
                            className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                )}

                {/* Comments Section */}
                {post.comments && post.comments.length > 0 && (
                    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-8 mt-8">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            Comments ({post.comments.length})
                        </h2>
                        <div className="space-y-4">
                            {post.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4"
                                >
                                    <div className="flex gap-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                                        {comment.user?.username?.charAt(0).toUpperCase() || 'A'}
                                    </div>
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium text-gray-900">
                                            {comment.user?.username || 'Anonymous'}
                                        </span>
                                    </div>
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300">
                                        {comment.content}
                                    </p>
                                    <time className="text-xs text-zinc-400 mt-2 block">
                                        {formatDate(new Date(comment.createdAt))}
                                    </time>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
};

export default PostAction;
