import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEProps {
  value: string;
  onChange: (content: string) => void;
}

const TinyMCE = ({value, onChange} : TinyMCEProps) => {
    return (
        <div className="flex justify-center w-full">
            <Editor 
                value={value}
                onEditorChange={onChange}
                apiKey={`${import.meta.env.VITE_TINYMCE_API}`}
                init={{
                    placeholder: "Post content here...",
                    onboarding: false,
                    width: '100%',
                    plugins: [
                        'autolink', 'lists', 'link', 'image'
                    ],
                    file_picker_types: 'image',
                    file_picker_callback: (cb: (url: string) => void) => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');

                        input.addEventListener('change', (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (!file) return;

                            const reader = new FileReader();
                            reader.addEventListener('load', async () => {
                                const formData = new FormData();
                                formData.append('file', file);

                                const res = await fetch(`${import.meta.env.VITE_API_URL}/uploadImage`, { method: 'POST', body: formData });
                                const { url } = await res.json();

                                cb(url);
                            });
                            reader.readAsDataURL(file);
                        });

                        input.click();
                    },
                }}
            />
        </div>
    )
}

export default TinyMCE


