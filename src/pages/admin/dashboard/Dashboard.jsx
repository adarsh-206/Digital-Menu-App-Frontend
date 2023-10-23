import React from 'react';
import { useLocation } from 'react-router-dom';
import RouteLink from '../../../components/RouteLink';

function Dashboard() {

    return (
        <div className='px-4 py-4'>
            <RouteLink />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                <div className="bg-blue-200 text-center p-4 rounded shadow-md h-32">
                    <p>Total Items</p>
                    <p className='font-semibold py-4 text-2xl'>23</p>
                </div>
                <div className="bg-green-200 text-center p-4 rounded shadow-md h-32">
                    <p>Total User</p>
                    <p className='font-semibold py-4 text-2xl'>13</p>
                </div>
                <div className="bg-yellow-200 text-center p-4 rounded shadow-md h-32">
                    <p>Total Scans</p>
                    <p className='font-semibold py-4 text-2xl'>73</p>
                </div>
                <div className="bg-purple-200 text-center p-4 rounded shadow-md h-64">
                    <p>Upcoming events</p>
                    <p className='font-semibold py-4 text-2xl'>0</p>
                </div>
                <div className="bg-pink-200 text-center p-4 rounded shadow-md h-64 md:col-span-2">
                    <p>Analysis</p>
                    <p className='font-semibold py-4 text-2xl'>0</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;