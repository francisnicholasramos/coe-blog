import {  
    Button, 
    Dropdown,  
    DropdownTrigger,  
    DropdownMenu,  
    DropdownItem
} from "@heroui/react";
import { FaSortDown } from "react-icons/fa6";
import { useState } from "react";
interface SortItemsProps {
    fetchPosts: (sortBy: string, order: string) => Promise<void>;
}
const SortItems = ({ fetchPosts }: SortItemsProps) => {
    const [currentSort, setCurrentSort] = useState<string>("");

    const handleSort = (key: React.Key) => {
        switch (key) {
            case "newest":
                fetchPosts("createdAt", "desc");
                setCurrentSort("Newest");
                break;
            case "oldest":
                fetchPosts("createdAt", "asc");
                setCurrentSort("Oldest");
                break;
            case "a-z":
                fetchPosts("title", "asc");
                setCurrentSort("A-Z");
                break;
            case "z-a":
                fetchPosts("title", "desc");
                setCurrentSort("Z-A");
                break;
        }
    };

    const buttonText = currentSort ? `Sort By: ${currentSort}` : "Sort By";

    const isMobile = window.innerWidth < 768;
    return (
        <div className="max-w-7xl w-full mx-auto">
            <Dropdown className="flex justify-end">
                <DropdownTrigger>
                    <Button size={isMobile ? "sm" : "md"} className="flex items-center justify-center bg-transparent border border-gray-300">
                        <span>{buttonText}</span>
                        <FaSortDown className="mb-1"/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Sort options" 
                    onAction={handleSort}
                >
                    <DropdownItem key="newest">Newest</DropdownItem>
                    <DropdownItem key="oldest">Oldest</DropdownItem>
                    <DropdownItem key="a-z">A-Z</DropdownItem>
                    <DropdownItem key="z-a">Z-A</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
export default SortItems;
