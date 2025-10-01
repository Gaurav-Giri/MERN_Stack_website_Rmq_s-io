// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';
// import { ROUTES, isProtectedRoute } from '../../routes';

// const ProtectedRoute = () => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <div className="loading-screen">Loading...</div>;
//   }

//   if (!user && isProtectedRoute(location.pathname)) {
//     return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return children;
}


