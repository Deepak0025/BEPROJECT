import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/ui/custom/Header.jsx';
import DashboardDetails from './dashboard/index.jsx';
import SalesDetails from './sales-details/index.jsx';
import Hero from './components/ui/custom/Hero.jsx';
import AiRelated from './magic/index.jsx';

function App() {
    const user = localStorage.getItem('user'); // Check if user is logged in
    const isAuthenticated = !!user; // Convert user to boolean

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/dashboard" element={<DashboardDetails />} />
                <Route 
                    path="/sales-details" 
                    element={isAuthenticated ? <SalesDetails /> : <Navigate to="/" replace />} 
                />
                <Route 
                    path="/magic-ai" 
                    element={isAuthenticated ? <AiRelated /> : <Navigate to="/" replace />} 
                />
            </Routes>
        </div>
    );
}

export default App;
