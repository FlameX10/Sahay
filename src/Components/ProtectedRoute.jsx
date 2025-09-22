import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectUserType } from '../store/slices/authSlice';

const ProtectedRoute = ({ children, allowedRoles = [], fallbackPath = '/login' }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  const location = useLocation();

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // If specific roles are required, check user role
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    // Redirect to appropriate dashboard based on user type
    const getDefaultPath = (userType) => {
      switch (userType) {
        case 'admin':
          return '/admin';
        case 'collage_admin':
          return '/institution/dashboard';
        case 'student':
          return '/student/dashboard';
        case 'counsellor':
          return '/counsellor/dashboard';
        default:
          return '/dashboard';
      }
    };
    
    return <Navigate to={getDefaultPath(userType)} replace />;
  }

  return children;
};

export default ProtectedRoute;
