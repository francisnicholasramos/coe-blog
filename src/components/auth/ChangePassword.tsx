import { useState } from "react";
import {apiFetch} from "../../utils/api";
import type {ChangePasswordProps} from "../../types/index";
import {Form, Input, Button} from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const ChangePassword = () => {
    const [credentials, setCredentials] = useState<ChangePasswordProps>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await apiFetch('/user/change-password', {
                method: 'PUT',
                body: JSON.stringify(credentials)
            })

            if (res.ok) {
                window.location.href = '/login'
            } else {
                const error = await res.json();
                setError(error.message) 
            }
        } catch {
            setError('Something went wrong.')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center mt-2 py-3 gap-y-3 justify-center w-full">
            <Form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full rounded-md">
                <Input 
                    label="Current Password" 
                    type={isVisible ? "text" : "password"}
                    onChange={(e) => setCredentials({...credentials, currentPassword: e.target.value})}
                    autoFocus
                    required
                    endContent={
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className="focus:outline-none"
                        >
                            {isVisible ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                        </button>
                    }
                />

                <Input 
                    label="New Password" 
                    type={isVisible ? "text" : "password"}
                    onChange={(e) => setCredentials({...credentials, newPassword: e.target.value})}
                    required
                    endContent={
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className="focus:outline-none"
                        >
                            {isVisible ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                        </button>
                    }
                />

                <Input 
                    label="Confirm Password" 
                    type={isVisible ? "text" : "password"}
                    onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
                    required
                    endContent={
                        <button
                            type="button"
                            onClick={() => setIsVisible(!isVisible)}
                            className="focus:outline-none"
                        >
                            {isVisible ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                        </button>
                    }
                />

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-black text-white min-w-full"
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </Form>
        </div>
    );
};

export default ChangePassword;
