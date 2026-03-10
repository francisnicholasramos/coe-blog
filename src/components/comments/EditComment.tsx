import {useState} from "react";
import { IoSendSharp } from "react-icons/io5";
import {Textarea, Button} from "@heroui/react";

interface EditCommentProps {
    commentId: string;
    initialContent: string;
    onCancel: () => void;
    onSuccess: () => void;
}

const EditComment = ({commentId, initialContent, onCancel, onSuccess}: EditCommentProps) => {
    const [editComment, setEditComment] = useState(initialContent);
    const [errorComment, setErrorComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editComment.trim()) {
            setErrorComment("Comment cannot be empty.");
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content: editComment.trim() })
            });

            if (response.status === 403) {
                setErrorComment("You must be logged in to edit comment.")
                setIsSubmitting(false);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to edit comment');
            }

            setErrorComment("");
            onSuccess();
        } catch { 
            setErrorComment('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmitComment} className="flex flex-col gap-2 mb-4">
            <Textarea 
                rows={1}
                value={editComment}
                onValueChange={setEditComment}
                placeholder="Edit your comment..."
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmitComment(e);
                    }
                    if (e.key === "Escape") {
                        onCancel();
                    }
                }}
                classNames={{
                    inputWrapper: "rounded-sm border border-gray-300 bg-white hover:bg-white hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 data-[hover=true]:bg-white data-[hover=true]:border-gray-300"
                }}
                endContent={
                    <Button 
                        type="submit" 
                        className="mt-auto min-w-0 p-0 bg-transparent"
                        isLoading={isSubmitting}
                    >
                        <IoSendSharp size={17} className="text-gray-500 hover:text-blue-900"/>
                    </Button>
                }
            />

            <div className="flex space-x-1">
                <span className="text-xs text-gray-500">Press Esc to</span>
                <Button size="sm" variant="light" onPress={onCancel} className="hover:bg-none hover:underline p-0 h-auto min-w-0 text-blue-700">
                    cancel
                </Button>
            </div>

            {errorComment && (
                <p className="mt-1 text-sm text-red-600">
                    {errorComment}
                </p>
            )}
        </form>
    )
}

export default EditComment
