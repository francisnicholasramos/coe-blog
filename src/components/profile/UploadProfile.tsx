import { useState, useRef } from "react";
import { Button } from "@heroui/react";
import {apiFetch } from "../../utils/api";

const UploadProfile = ({onClose}: {onClose?: () => void}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
                setError(null);
                setSuccess(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setError("Please select an image first");
            return;
        }
        setIsUploading(true);
        setError(null);
        setSuccess(false);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await apiFetch('/uploadAvatar', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                onClose?.();
                return;
            } else {
                const data = await res.json();
                setError(data.message || 'Failed to upload image');
            }
        } catch {
            setError('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 w-full">
            <label className="flex flex-col mt-3 text-gray-600 items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50">
                + Upload photo
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </label>
            {preview && (
                <div className="flex flex-col gap-5">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="mx-auto mt-4 w-30 h-30 object-cover rounded-full"
                    />
                    <div className="ml-auto">
                        <Button 
                            type="submit"
                            color="primary"
                            isLoading={isUploading}
                            className="text-white h-fit py-2 rounded-md"
                        >
                            Upload
                        </Button> 
                    </div>
                </div>
            )}

            {error && (
                <p className="text-center text-red-500 text-sm mt-2">{error}</p>
            )}
            
            {success && (
                <p className="text-green-500 text-sm mt-2">Image uploaded successfully!</p>
            )}
        </form>
    );
};
export default UploadProfile;
