import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import { useMediaQuery } from "react-responsive";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/')
        }
    }, []);

    return (
        <div className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'}`}>
            <Sidebar />
            <main className="flex-1">
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default Layout;