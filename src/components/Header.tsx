import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {useAuth} from '../hooks/useAuth';
import {Button} from "@heroui/react";
import { slide as Menu } from 'react-burger-menu'

export function Header() {
    const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const handleLogout = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
            method: "POST",
            credentials: "include"
        })
        window.location.href = "/login"
    };
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
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
                {isSearchOpen ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Search NOT working.In progress.."
                      className="w-48 sm:w-64 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    aria-label="Search"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {/* Write Button */}
              <button 
                onClick={() => navigate('/write')}
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" 
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span>Write</span>
              </button>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <span className="font-medium cursor-pointer text-gray-600">Dashboard</span>
                  </Link>
                  <span className="text-sm font-medium text-gray-600">{user?.username}</span>
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
            <button 
                className="md:hidden p-2 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Burger Menu */}
      <Menu 
          right
          isOpen={isMenuOpen}
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
      >
          {isAuthenticated ? (
              <div className="flex flex-col">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/write" onClick={() => setIsMenuOpen(false)}>Write</Link>
                  <span className="block py-2">{user?.username}</span>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
              </div>
          ) : (
              <div>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </div>
          )}
      </Menu>
    </>
  );
}
