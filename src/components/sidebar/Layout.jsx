import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/');
        }
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;