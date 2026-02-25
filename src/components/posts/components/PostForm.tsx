import { useState } from "react";
import {Form, Input, Textarea, Switch, Button} from "@heroui/react";
const PostForm = () => {
    const [contents, setContents] = useState({
        title: '',
        content: '',
        isPublish: false
    })
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    title: contents.title,
                    content: contents.content,
                    published: contents.isPublish
                })
            })

            if (res.ok) {
                window.location.href = "/dashboard"
            } else {
                const error = await res.json();
                setError(error.message);
            }
        } catch {
            setError('Something went wrong.')
        }
    }
    return (
        <div className="flex flex-col gap-y-3 mt-5 mx-auto w-full min-w-xs max-w-4xl px-3">
            <Form onSubmit={handleSubmit} className="w-full rounded-md">
                {/* username field */}
                <Input 
                    type="text" 
                    placeholder="Post title"
                    variant="underlined"
                    onChange={(e) => setContents({...contents, title: e.target.value})}
                    required
                    classNames={{
                        input: "text-3xl"
                    }}
                />

                <Textarea
                    isRequired
                    disableAutosize
                    labelPlacement="outside"
                    onChange={(e) => setContents({...contents, content: e.target.value})}
                    placeholder="Post content"
                    minRows={3}
                    classNames={{
                        input: "resize-y min-h-[40px]",
                    }}
                />

                <div className="flex items-center gap-2">
                    <Switch 
                        aria-label="Automatic updates" 
                        color="success"
                        onValueChange={(isSelected) => setContents({...contents, isPublish: isSelected})}
                    />
                    <label className="text-md text-gray-500">
                        Publish
                    </label>
                </div>
                
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button
                    type="submit"
                    className="ml-auto bg-black text-white max-w-xs"
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default PostForm;

