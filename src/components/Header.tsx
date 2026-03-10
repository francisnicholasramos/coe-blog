import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {useAuth} from '../hooks/useAuth';
import {Button} from "@heroui/react";
import BurgerMenu from './dashboard/components/BurgerMenu'
import Dialog from "./Dialog";
import SearchBar from "./SearchBar";
import { FaRegPenToSquare } from "react-icons/fa6";
import { ImSearch } from "react-icons/im";
import {apiFetch} from "../utils/api";

export function Header() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const handleLogout = async () => {
        await apiFetch(`/logout`, {
            method: "POST",
            credentials: "include"
        })
        window.location.href = "/login"
    };
    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
                                COE
                            </Link>
                        </div>
                        {/* Desktop Navigation - hidden on mobile */}
                        <div className="hidden md:flex items-center space-x-4">
                            {/* Search */}
                            <div className="relative">
                                <Button
                                    onPress={() => setIsOpen(true)}
                                    className="bg-transparent text-gray-600 min-w-0"
                                >
                                    <ImSearch size={17}/>
                                </Button>
                            </div>
                            {/* Write Button */}
                            <button 
                                onClick={() => navigate('/write')}
                                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" 
                            >
                                <FaRegPenToSquare />
                                <span>Write</span>
                            </button>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/dashboard">
                                        <span className="font-medium cursor-pointer text-gray-600">Dashboard</span>
                                    </Link>
                                    <span className="text-sm font-medium text-gray-600"></span>
                                    <button onClick={handleLogout} className="font-medium cursor-pointer text-gray-600 hover:text-gray-900">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button className="font-medium text-gray-600 cursor-pointer hover:text-gray-900">Login</button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="px-4 py-2 text-white bg-gray-900 rounded-full cursor-pointer hover:bg-gray-800">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Burger Button - visible on mobile only */}
                        <div 
                            className="md:hidden flex items-center p-2 text-gray-600"
                        >
                            <Button
                                onPress={() => setIsOpen(true)}
                                className="bg-transparent text-gray-600 w-fit"
                            >
                                <ImSearch size={17}/>
                            </Button>
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <SearchBar />
            </Dialog>
        </>
  );
}
