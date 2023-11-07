import React from 'react';
import MySidebar from './MySidebar';

const SidebarLayout = ({ children }) => {
    return (
        <div className="relative flex">
            <MySidebar />
            <main className="">
                {children}
            </main>
        </div>
    );
}

export default SidebarLayout;