import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

// Loading component for better UX
const RouteLoading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

// Main Protected Route component
const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  fallbackPath = "/login",
  loadingComponent 
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return loadingComponent || <RouteLoading />;
  }
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // Redirect if admin required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Render the protected component
  return children;
};

// Public Route component (redirects if already authenticated)
const PublicRoute = ({ 
  children, 
  fallbackPath = "/",
  loadingComponent 
}) => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return loadingComponent || <RouteLoading />;
  }
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // Render the public component
  return children;
};

// Optional: Route with specific permissions
const PermissionRoute = ({ 
  children, 
  requiredPermissions = [],
  userPermissions = [],
  fallbackPath = "/",
  loadingComponent 
}) => {
  const { loading } = useAuth();
  
  // Show loading state
  if (loading) {
    return loadingComponent || <RouteLoading />;
  }
  
  // Check if user has all required permissions
  const hasPermission = requiredPermissions.every(permission => 
    userPermissions.includes(permission)
  );
  
  // Redirect if missing required permissions
  if (!hasPermission) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // Render the component if permissions are satisfied
  return children;
};

// Higher-order component for protecting components
const withProtection = (Component, protectionProps = {}) => {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute {...protectionProps}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Higher-order component for public components (redirect if authenticated)
const withPublic = (Component, publicProps = {}) => {
  return function PublicComponent(props) {
    return (
      <PublicRoute {...publicProps}>
        <Component {...props} />
      </PublicRoute>
    );
  };
};

export default ProtectedRoute;
export { 
  PublicRoute, 
  PermissionRoute, 
  withProtection, 
  withPublic,
  RouteLoading 
};