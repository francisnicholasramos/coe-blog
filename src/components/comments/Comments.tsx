import {useState} from "react";
import { IoSendSharp } from "react-icons/io5";
import {Textarea, Button} from "@heroui/react";

import type {Post} from "../../types"

const Comments = (
    {postId, post, refetch}: 
    {postId: string, post: Post, refetch: ()=> void;
}) => {
    const [comment, setComment] = useState("");
    const [errorComment, setErrorComment] = useState<string>(""); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment.trim()) {
            setErrorComment("Comment cannot be empty.")
            return;
        }

        if (!postId || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/comments?id=${postId}`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content: comment.trim() })
            });

            if (response.status === 403) {
                setErrorComment("You must be logged in to comment.")
                setIsSubmitting(false);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to post comment');
            }

            setComment("");
            setErrorComment("");
            refetch();
        } catch { 
            setErrorComment('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
                <h2 className="text-gray-800 text-2xl font-semibold mb-2">
                    Comments 
                    {post.comments?.length ? ` (${post.comments.length})` : ''}
                </h2>
                <form onSubmit={handleSubmitComment} className="mb-4">
                    <Textarea 
                        rows={1}
                        value={comment}
                        onValueChange={setComment}
                        placeholder="Write a comment..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();          // Stop new line
                                handleSubmitComment(e);      // Trigger submit
                            }
                        }}
                        classNames={{
                            inputWrapper: "rounded-sm border border-gray-300 bg-white hover:bg-white hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 data-[hover=true]:bg-white data-[hover=true]:border-gray-300"
                        }}
                        endContent={
                            <Button 
                                type="submit" 
                                className="mt-auto min-w-0 p-0 bg-transparent"
                            >
                                <IoSendSharp size={17} className="text-gray-500 hover:text-blue-900"/>
                            </Button>
                        }
                    />
                    {errorComment && (
                        <p className="mt-1 text-sm text-red-600">
                            {errorComment}
                        </p>
                    )}
                </form>
        </section>
    )
}

export default Comments

