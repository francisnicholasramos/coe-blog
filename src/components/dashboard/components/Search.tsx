import { useState } from 'react'
import {useNavigate} from "react-router";
import { Input, Button } from "@heroui/react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (query.trim()) {
            navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input 
                size="lg"
                placeholder="Search blogs..."
                autoFocus
                value={query}
                onValueChange={setQuery}
                classNames={{
                    inputWrapper: "bg-transparent border border-gray-300"
                }}
                endContent={
                    <Button 
                        type="submit" 
                        className="min-w-0 p-0 bg-transparent"
                    >
                        <IoSearch size={20} className="text-gray-800" />
                    </Button>
                }
            />
        </form>
    );
};
export default SearchBar;
