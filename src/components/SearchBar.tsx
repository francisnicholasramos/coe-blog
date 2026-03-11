import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Button } from "@heroui/react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setQuery('');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Input 
                size="lg"
                placeholder="Search stories..."
                value={query}
                autoFocus
                onValueChange={setQuery}
                endContent={
                    <Button 
                        type="submit" 
                        className="min-w-0 pr-1 bg-transparent"
                    >
                        <IoSearch size={20} className="text-gray-800" />
                    </Button>
                }
            />
        </form>
    );
};
export default Search;
