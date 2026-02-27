import { useNavigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '@heroui/react';
import { FaRegPenToSquare } from "react-icons/fa6"; 
import { IoHome } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const BurgerMenu = ({ isOpen, onClose }: BurgerMenuProps) => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const handleLogout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: "POST",
            credentials: "include"
        });
        window.location.href = "/login";
    };
    const handleLinkClick = (path: string) => {
        navigate(path);
        onClose();
    };
    return (
        <>
            {/* Overlay - click to close */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            {/* Menu Panel - slides from right, overlaps header */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-50 bg-gray-50  z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Menu Items */}
                <div className="pt-16 px-4 space-y-5">
                    {isAuthenticated ? (
                        <>
                            <button onClick={() => handleLinkClick('/dashboard')} className="flex items-center gap-x-2 w-full text-left text-gray-700 hover:text-gray-900">
                                <IoHome />
                                <span>Dashboard</span>
                            </button>
                            <button onClick={() => handleLinkClick('/write')} className="flex items-center gap-x-2 w-full text-left text-gray-700 hover:text-gray-900">
                                <FaRegPenToSquare />
                                <span>Write</span>
                            </button>
                            <span className="block text-sm text-gray-500">{user?.username}</span>
                            <button onClick={() => { handleLogout(); onClose(); }} className="flex items-center gap-x-2 w-full text-left text-gray-700 hover:text-gray-900">
                                <MdLogout />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-y-3">
                            <Button onPress={() => handleLinkClick('/login')} className="border border-gray-900 bg-white flex items-center mx-auto gap-x-2 w-full hover:text-gray-900">
                                <span>Log In</span>
                            </Button>
                            <Button onPress={() => handleLinkClick('/signup')} className="w-full bg-gray-900 text-white">
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
export default BurgerMenu;
