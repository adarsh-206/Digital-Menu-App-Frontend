import React from "react";
import Sidebar from './Sidebar';
import { useMediaQuery } from "react-responsive";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });

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