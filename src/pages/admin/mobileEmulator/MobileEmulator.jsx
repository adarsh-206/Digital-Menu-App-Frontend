import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileEmulator.css';
import axios from 'axios';
import { MdOutlineRocketLaunch } from 'react-icons/md';

const MobileEmulator = ({ children }) => {
    const navigate = useNavigate();
    const [menuId, setMenuId] = useState();
    const [isLaunch, setIsLaunch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getMenus = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const menuListEndpoint = '/api/menus';
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + menuListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const responseData = response.data || [];
                    setMenuId(responseData[0].id);
                    setIsLaunch(responseData[0].launch_status);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const launchMenu = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const menuListEndpoint = `/api/restaurants/generate-qr-code?menu_id=${menuId}`;
        const token = localStorage.getItem('access_token');

        if (token) {
            setIsLoading(true);

            axios.get(baseUrl + menuListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    localStorage.setItem("qr_code_link", response.data.qr_code_link);
                    setTimeout(() => {
                        getMenus();
                    }, 1500);
                    navigate('/design-qr');
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                });
        }
    }

    const unlaunchMenu = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const unLaunchEndpoint = `/api/menus/set_launch_status_false/${menuId}/`;
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.post(baseUrl + unLaunchEndpoint, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    getMenus()
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        getMenus()
    })

    return (
        <div className="mobile-emulator bg-slate-50">
            <div className="mobile-emulator-content">
                {children}
            </div>
            {!isLaunch ? (
                <button
                    className={`floating-button ${isLoading
                        ? 'bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700'
                        : 'bg-[#940B92]'
                        } ${isLoading ? 'loading' : ''}`}
                    onClick={launchMenu}
                    disabled={isLoading}
                >
                    <span className='flex gap-2 items-center'>
                        {isLoading ? 'Loading...' : 'Launch Menu'}
                        {!isLoading && <MdOutlineRocketLaunch size={18} color="white" className='animate-bounce' />}
                    </span>
                </button>
            ) : (
                <button className="floating-button bg-[#940B92]" onClick={unlaunchMenu}>
                    <span className='flex gap-2 items-center'>
                        Launched <MdOutlineRocketLaunch size={18} color="white" />
                    </span>
                </button>
            )}
        </div>
    );
};

export default MobileEmulator;
