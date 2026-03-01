import { useState } from "react";
import {Form, Input, Switch, Button} from "@heroui/react";
import TinyMCE from "../../editor/TinyMCE";

const PostForm = () => {
    const [contents, setContents] = useState({
        title: '',
        content: '',
        isPublish: false
    })
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const textOnly = contents.content.replace(/<[^>]*>/g, '').trim();
        if (!textOnly) {
            setError('Content is required');
            return;
        }

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

                <TinyMCE 
                    value={contents.content}
                    onChange={(content) => setContents({...contents, content})}
                />

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

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

