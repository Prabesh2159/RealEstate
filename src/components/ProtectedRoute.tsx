// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getAccessToken, checkAdmin, logout } from '@/back/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Check if user has valid tokens
        if (!isAuthenticated()) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        // If admin access is required, check admin status
        if (requireAdmin) {
          const token = getAccessToken();
          if (token) {
            const adminCheck = await checkAdmin(token);
            if (adminCheck.is_admin) {
              setIsAuthorized(true);
            } else {
              // User is authenticated but not admin
              logout();
              setIsAuthorized(false);
            }
          } else {
            setIsAuthorized(false);
          }
        } else {
          // Just need to be authenticated
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error('Authorization check failed:', error);
        logout();
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [requireAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006d4e] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
