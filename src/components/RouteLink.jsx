import React from 'react'
import { useLocation } from 'react-router-dom'

function capitalizeFirstLetter(str) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function RouteLink() {
    const location = useLocation();
    const routeName = location.pathname.split('/').filter(part => part !== '')[0];
    const capitalizedRouteName = capitalizeFirstLetter(routeName);

    return (
        <div className='flex justify-end my-5'>
            <span className='text-slate-400'>Dashboard / {capitalizedRouteName}</span>
        </div>
    );
}

export default RouteLink;