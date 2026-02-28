import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {Spinner} from '@heroui/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) =>  {
    const { isAuthenticated, loading } = useAuth()
    if (loading) {
        return <div className="flex items-center justify-center min-h-full">
                    <Spinner className="mt-5" variant="spinner" />
               </div> 
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return <>{children}</>
}

export default ProtectedRoute;
