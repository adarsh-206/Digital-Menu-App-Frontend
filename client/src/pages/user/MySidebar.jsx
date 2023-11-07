import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { RxCross2 } from 'react-icons/rx';
import { HiMenu } from 'react-icons/hi';

function MySidebar({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        // position: 'fixed'
        <div style={{ position: '', width: isSidebarOpen ? '64px' : '0', height: '100vh', backgroundColor: 'white', transition: 'width 0.3s', zIndex: 2 }}>
            <button
                onClick={toggleSidebar}
                className="p-3 cursor-pointer"
                style={{ display: isSidebarOpen ? 'none' : 'block' }}
            >
                <HiMenu size={25} />
            </button>

            <div className={`flex-col ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden transition-all duration-300`} style={{ backgroundColor: 'white', height: '100%' }}>
                {isSidebarOpen && (
                    <div className="p-3 text-right">
                        <button
                            onClick={toggleSidebar}
                            className="cursor-pointer"
                        >
                            <RxCross2 size={22} />
                        </button>
                    </div>
                )}

                <Sidebar aria-label="Sidebar" className='h-screen'>
                    <div className="flex items-center px-3 gap-2.5 font-medium">
                        <img
                            src="https://img.icons8.com/arcade/64/xbox-menu.png"
                            width={35}
                            alt=""
                        />
                        <span className={`text-lg font-semibold whitespace-pre ${open ? "block" : "hidden"}`}>
                            My Restaurant
                        </span>
                    </div>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <div>
                                <p className="font-semibold text-gray-600 text-xs text-left pb-3">Opening Hours</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-xs">
                                    <span>Monday</span>
                                </div>
                                <div className="text-xs">
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="text-xs">
                                    <span>Tuesday</span>
                                </div>
                                <div className="text-xs">
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="text-xs">
                                    <span>Wednesday</span>
                                </div>
                                <div className="text-xs">
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="text-xs">
                                    <span>Thursday</span>
                                </div>
                                <div className="text-xs">
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="text-xs">
                                    <span>Friday</span>
                                </div>
                                <div className="text-xs">
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                                <div className="text-xs">
                                    <span>Saturday</span>
                                </div>
                                <div className="text-xs">
                                    <span>9:00 AM - 10:00 PM</span>
                                </div>
                            </div>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            {children}
        </div>
    );
}

export default MySidebar;