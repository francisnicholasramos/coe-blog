import { useState } from "react";
import type {LoginProps} from "../../types/index";
import {Form, Input, Button} from "@heroui/react";

const Login = () => {
    const [credentials, setCredentials] = useState<LoginProps>({
        username: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(credentials)
            });

            if (res.ok) {
                window.location.href = '/dashboard'
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
        <div className="flex flex-col items-center mt-2 mx-auto p-3 gap-y-2 justify-center w-full min-w-xs max-w-sm">
            <h1 className="text-2xl mx-auto">Login</h1>
            <Form onSubmit={handleSubmit} className="w-full rounded-md">
                {/* username field */}
                <Input 
                    label="Username" 
                    type="text" 
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
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
                    disabled={isLoading}
                    className="bg-black text-white min-w-full"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </div>
    );
};

export default Login;
