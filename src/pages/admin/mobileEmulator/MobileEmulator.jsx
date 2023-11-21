// MobileEmulator.jsx

import React, { useEffect, useState } from 'react';
import './MobileEmulator.css';
import axios from 'axios';

const MobileEmulator = ({ children }) => {

    const [menuId, setMenuId] = useState();
    const [isLaunch, setIsLaunch] = useState(false);

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
            axios.get(baseUrl + menuListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    localStorage.setItem("qr_code_link", response.data.qr_code_link)
                    getMenus()
                })
                .catch(error => {
                    console.log(error);
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
            {!isLaunch ?
                <button className="floating-button" onClick={launchMenu}>
                    Launch Menu
                </button>
                :
                <button className="floating-button" onClick={unlaunchMenu}>
                    Launched!!
                </button>
            }
        </div>
    );
};

export default MobileEmulator;
