import { useState } from "react";
import {Form, Input, Button} from "@heroui/react";

const Signup = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    });
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
                    type="Password" 
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    required
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

