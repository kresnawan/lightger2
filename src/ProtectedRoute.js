    import React from 'react';
    import { Navigate, Outlet } from 'react-router-dom';
    import { useAuth } from './AuthContext'; // Assuming you have AuthContext

    const ProtectedRoute = ({ children }) => {
      const { isAuthenticated } = useAuth(); // Get auth status from context

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }

      return children ? children : <Outlet />; // Render children or nested routes
    };

    export default ProtectedRoute;