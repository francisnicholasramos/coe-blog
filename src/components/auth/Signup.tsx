import { useState } from "react";
import {Form, Input, Button} from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(credentials)
            });

            if (res.ok) {
                window.location.href='/dashboard'
            } else {
                const error = await res.json();
                setError(error.message);
            }
        } catch {
            setError('Something went wrong.')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-2 mx-auto p-3 gap-y-2 justify-center w-full min-w-xs max-w-sm">
            <h1 className="text-2xl">Sign Up</h1>
            <Form onSubmit={handleSubmit} className="w-full">
                {/* username field */}
                <Input 
                    label="Username" 
                    type="text" 
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    autoFocus
                    required
                />

                {/* email field */}
                <Input 
                    label="Email" 
                    type="email" 
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    required
                />

                {/* password field */}
                <Input 
                    label="Password" 
                    type={isVisible ? "text" : "password"}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
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
                    className="bg-black text-white min-w-full"
                >
                    {isLoading ? 'Signing in...' : 'Sign Up'}
                </Button>
            </Form>
        </div>
    )
}

export default Signup

