import React, { useEffect, useState } from 'react';
import MobileEmulator from '../mobileEmulator/MobileEmulator';
import Menu from '../../user/Menu';
import axios from 'axios';


function PreviewMenu() {
    const [gstNo, setGstNo] = useState();
    const [menuId, setMenuId] = useState();

    const getRestaurant = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const restaurantEndpoint = '/api/user/has-restaurant';
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + restaurantEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setGstNo(response.data.restaurant_details.gst_no)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const getMenus = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const menuListEndpoint = '/api/menus';
        const token = localStorage.getItem('access_token')

        if (token) {
            axios.get(baseUrl + menuListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const responseData = response.data || [];
                    setMenuId(responseData[0].id)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        getRestaurant()
        getMenus()
    }, [])

    return (
        <MobileEmulator>
            <Menu gstNo={gstNo} menuId={menuId} />
        </MobileEmulator>
    );
}

export default PreviewMenu;