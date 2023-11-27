import React, { useState, useEffect, useRef } from "react";
import { MdPersonOutline, MdNotificationsNone } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { GrUserSettings, GrSettingsOption } from "react-icons/gr";
import { IoLogInOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (!showNotifications) {
            setShowUserProfile(false);
        }
    };

    const toggleUserProfile = () => {
        setShowUserProfile(!showUserProfile);
        if (!showUserProfile) {
            setShowNotifications(false);
        }
    };

    const handleLogOut = () => {
        const token = localStorage.getItem('access_token');

        if (token) {
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const baseUrl = import.meta.env.VITE_BASE_URL;
            const endpoint = '/api/user/logout';

            axios.post(baseUrl + endpoint, null, { headers })
                .then((response) => {
                    localStorage.removeItem('access_token');
                    navigate('/login');
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    useEffect(() => {
        const closeDropdowns = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowNotifications(false);
                setShowUserProfile(false);
            }
        };

        document.addEventListener("mousedown", closeDropdowns);

        return () => {
            document.removeEventListener("mousedown", closeDropdowns);
        };
    }, []);

    return (
        <div className={`p-0 m-0 ${isSmallScreen ? "absolute top-0 right-0" : ""}`}>
            <div className={`max-w-full p-3.5 gap-5 sm:shadow-md ${isSmallScreen ? "bg-transparent" : "bg-white"} ${isSmallScreen ? "w-auto flex" : "flex justify-end"}`}>
                {isSmallScreen ? (
                    <>
                        <MdNotificationsNone size={25} onClick={toggleNotifications} />
                        {showNotifications && (
                            <div className="absolute top-12 right-0 w-64 bg-slate-100 shadow-md rounded cursor-pointer" ref={dropdownRef}>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2"><GrUserSettings size={16} />Profile picture updated!!</p>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2"><GrUserSettings size={16} />Profile picture updated!!</p>
                            </div>
                        )}
                        <MdPersonOutline className="cursor-pointer" size={25} onClick={toggleUserProfile} />
                        {showUserProfile && (
                            <div className="absolute top-12 right-0 w-32 bg-slate-100 shadow-lg rounded mr-1 cursor-pointer" ref={dropdownRef}>
                                {/* <p className="hover:bg-slate-200 p-2 flex items-center gap-2">
                                    <GrUserSettings size={16} />
                                    <span>Profile</span>
                                </p> */}
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2">
                                    <Link to="/my-restaurant" className="flex items-center gap-2 text-black">
                                        <GrSettingsOption size={16} />
                                        <span className="text-black">My Restaurant</span>
                                    </Link>
                                </p>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2">
                                    <Link to="/my-events" className="flex items-center gap-2 text-black">
                                        <GrSettingsOption size={16} />
                                        <span className="text-black">My Events</span>
                                    </Link>
                                </p>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2" onClick={handleLogOut}>
                                    <IoLogInOutline size={16} />
                                    <span>Logout</span>
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <MdNotificationsNone size={25} onClick={toggleNotifications} />
                        {showNotifications && (
                            <div className="absolute top-12 right-0 w-64 bg-slate-100 shadow-md rounded cursor-pointer mr-1" ref={dropdownRef}>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2 border-b"><GrUserSettings size={16} />Profile picture updated!!</p>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2"><GrUserSettings size={16} />Profile picture updated!!</p>
                            </div>
                        )}
                        <FaCircleUser size={23} onClick={toggleUserProfile} />
                        {showUserProfile && (
                            <div className="absolute top-12 right-0  bg-slate-100 shadow-lg rounded mr-1 cursor-pointer" ref={dropdownRef}>
                                {/* <p className="hover:bg-slate-200 p-2 flex items-center gap-2">
                                    <GrUserSettings size={16} />
                                    <span>Profile</span>
                                </p> */}
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2">
                                    <Link to="/my-restaurant" className="flex items-center gap-2 text-black">
                                        <GrSettingsOption size={16} />
                                        <span>My Restaurant</span>
                                    </Link>
                                </p>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2">
                                    <Link to="/my-events" className="flex items-center gap-2 text-black">
                                        <GrSettingsOption size={16} />
                                        <span>My Events</span>
                                    </Link>
                                </p>
                                <p className="hover:bg-slate-200 p-2 flex items-center gap-2" onClick={handleLogOut}>
                                    <IoLogInOutline size={16} />
                                    <span>Logout</span>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;