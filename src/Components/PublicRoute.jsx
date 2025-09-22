import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectUserType } from '../store/slices/authSlice';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userType = useSelector(selectUserType);
  const location = useLocation();

  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    const from = location.state?.from?.pathname;
    
    // If user was trying to access a specific page, redirect there
    if (from && from !== '/login') {
      return <Navigate to={from} replace />;
    }
    
    // Otherwise redirect to appropriate dashboard based on user type
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

export default PublicRoute;
