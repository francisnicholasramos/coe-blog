import {useState, useRef} from "react";
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyMCE = ({value, onChange} : TinyMCEProps) => {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const prevContentRef = useRef<string>('');

    const extractCloudinaryUrls = (content: string): string[] => {
        const regex = /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^"]+/g;
        return content.match(regex) || [];
    }

    const deleteImageFromCloudinary = async (url: string) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/uploadImage`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    };

    const handleEditorChange = (newContent: string) => {
        const oldUrls = extractCloudinaryUrls(prevContentRef.current);
        const newUrls = extractCloudinaryUrls(newContent);

        // find removed images
        const removedUrls = oldUrls.filter(url => !newUrls.includes(url));

        // delete removed images from Cloudinary
        removedUrls.forEach(url => {
            deleteImageFromCloudinary(url);
        });

        // update tracked images
        setUploadedImages(prev => prev.filter(url => newUrls.includes(url)));

        prevContentRef.current = newContent;
        onChange(newContent);
    };

    const handleImageUpload = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            fetch(`${import.meta.env.VITE_API_URL}/uploadImage`, { 
                method: 'POST', 
                body: formData 
            })
                .then(res => res.json())
                .then(data => {
                    const url = data.url;
                    setUploadedImages(prev => [...prev, url]);  // track uploaded URL
                    resolve(url);
                })
                .catch(reject);
        });
    };

    const handleFilePicker = (callback: (url: string) => void) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            try {
                const url = await handleImageUpload(file);
                callback(url);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        });

        input.click();
    };

    return (
        <div className="flex justify-center w-full">
            <Editor 
                value={value}
                onEditorChange={handleEditorChange}
                apiKey={`${import.meta.env.VITE_TINYMCE_API}`}
                init={{
                    placeholder: "Post content here...",
                    onboarding: false,
                    width: '100%',
                    menubar: "edit insert format",
                    mobile: {
                        menubar: "edit insert format",
                    },
                    plugins: [
                        'autolink', 'lists', 'link', 'image'
                    ],
                    file_picker_types: 'image',
                    file_picker_callback: handleFilePicker
                }}
            />
        </div>
    )
}

export default TinyMCE


