import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const { isAuthenticated, user, logout } = useAuth();

  const handleWriteClick = () => {
    if (!isAuthenticated) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
    } else {
      window.location.href = 'http://localhost:3001';
    }
  };

  const handleSignInClick = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
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

            {/* Right side - Navigation */}
            <div className="flex items-center space-x-4">
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
                onClick={handleWriteClick}
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
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
                <span className="text-sm font-medium">Write</span>
              </button>

              {isAuthenticated ? (
                <>
                  {/* User Name */}
                  <span className="text-sm font-medium text-gray-600">
                    {user?.username}
                  </span>
                  {/* Logout */}
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In */}
                  <button 
                    onClick={handleSignInClick}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign In
                  </button>

                  {/* Sign Up */}
                  <button 
                    onClick={handleSignUpClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
}
