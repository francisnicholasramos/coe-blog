import {useState} from "react";
import type {Post} from "../../types";
import {helpers} from "../../utils/helpers";
import {  
    Button, 
    Dropdown,  
    DropdownTrigger,  
    DropdownMenu,  
    DropdownItem
} from "@heroui/react";
import { FaEllipsisV } from "react-icons/fa";
import EditComment from "./EditComment";
import {useAuth} from "../../hooks/useAuth";
import {apiFetch} from "../../utils/api";

interface CommentSectionProps {
    post: Post;
    refetch?: () => void;
}

const CommentSection = ({post, refetch}: CommentSectionProps) => {
    const {user, isAuthenticated, loading} = useAuth();
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [error, setError] = useState('');

    const handleDeleteComment = async (commentId: string) => {
        setIsDeleting(true)

        try {
            const res = await apiFetch(`/comments/${commentId}`, {
                method: 'DELETE'
            })
            if (res.ok) refetch?.();
        } catch {
            setError('Something went wrong.')
        } finally {
            setDeleteConfirm(null);
        }
    }

    return (
        <section>
            {post.comments && post.comments.length > 0 ? (
                <div className="space-y-6">
                    {post.comments.map((comment) => {
                        const isEditing = editingCommentId === comment.id;
                        const isOwner = user?.id === comment.user?.id;

                        return (
                            <div key={comment.id} className="flex space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 shrink-0">
                                    {comment.user?.username?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-gray-900">
                                                {comment.user?.username || comment.username || 'Anonymous'}
                                            </span>
                                        </div>
                                        {isAuthenticated && !loading && isOwner &&(
                                        <Dropdown className="flex justify-end">
                                            <DropdownTrigger>
                                                <Button className="min-w-3 px-0 bg-transparent">
                                                    <FaEllipsisV className="text-gray-700"/>
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu 
                                                aria-label="Sort options" 
                                            >
                                                <DropdownItem 
                                                    key="edit"
                                                    onPress={() => setEditingCommentId(comment.id)}
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem 
                                                    key="delete"
                                                    onPress={() => setDeleteConfirm(comment.id)}
                                                >
                                                    Delete
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <EditComment
                                            commentId={comment.id}
                                            initialContent={comment.content}
                                            onCancel={() => setEditingCommentId(null)}
                                            onSuccess={() => {
                                                setEditingCommentId(null);
                                                refetch?.();
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <p className="text-gray-700">{comment.content}</p>
                                            <div>
                                                <time className="text-xs text-gray-400">
                                                    {helpers.formatDate(new Date(comment.createdAt), true)}
                                                </time>
                                            </div>
                                        </>
                                    )}
                                    {deleteConfirm && (
                                        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                                                <h3 className="text-lg font-semibold mb-4">Delete Comment</h3>
                                                <p className="text-gray-600 mb-6">
                                                    Are you sure you want to delete this comment? This action cannot be undone.
                                                </p>
                                                <div className="flex flex-col justify-end gap-3">
                                                    <div className="flex justify-end">
                                                    <Button 
                                                        variant="light" 
                                                        onPress={() => setDeleteConfirm(null)}
                                                        disabled={isDeleting}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button 
                                                        color="danger" 
                                                        onPress={() => handleDeleteComment(deleteConfirm)}
                                                        isLoading={isDeleting}
                                                    >
                                                        Delete
                                                    </Button>
                                                    </div>
                                                    {error && (
                                                        <p className="text-center text-red-500 text-sm mb-1">error{error}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
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
