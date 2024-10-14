// src/components/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/" replace />} // Redirect to home if not authenticated
        />
    );
};

export default ProtectedRoute;
