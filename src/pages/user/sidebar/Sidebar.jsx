import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { RxCross2 } from 'react-icons/rx';
import { HiMenu } from 'react-icons/hi';
import axios from 'axios';
import { FaLocationDot } from "react-icons/fa6";

const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);

    const options = {
        day: 'numeric',
        month: 'short',
    };

    return dateObject.toLocaleDateString('en-US', options);
};

function MySidebar({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [restaurantDetails, setRestaurantDetails] = useState([])
    const [eventData, setEventData] = useState([]);
    const [openingHours, setOpeningHours] = useState({
        Monday: { open: '', close: '' },
        Tuesday: { open: '', close: '' },
        Wednesday: { open: '', close: '' },
        Thursday: { open: '', close: '' },
        Friday: { open: '', close: '' },
        Saturday: { open: '', close: '' },
        Sunday: { open: '', close: '' },
    });

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const getTimings = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const createEventEndpoint = `/api/restaurants/opening-hours/`;
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + createEventEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const responseData = response.data || {}
                    const formatTime = (time) => time ? time.slice(0, 5) : '';
                    const convertTo12HourFormat = (time) => {
                        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
                        return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', options);
                    };
                    console.log("timess", convertTo12HourFormat(formatTime(responseData.monday_close)));
                    setOpeningHours({
                        Monday: {
                            open: convertTo12HourFormat(formatTime(responseData.monday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.monday_close)),
                        },
                        Tuesday: {
                            open: convertTo12HourFormat(formatTime(responseData.tuesday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.tuesday_close)),
                        },
                        Wednesday: {
                            open: convertTo12HourFormat(formatTime(responseData.wednesday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.wednesday_close)),
                        },
                        Thursday: {
                            open: convertTo12HourFormat(formatTime(responseData.thursday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.thursday_close)),
                        },
                        Friday: {
                            open: convertTo12HourFormat(formatTime(responseData.friday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.friday_close)),
                        },
                        Saturday: {
                            open: convertTo12HourFormat(formatTime(responseData.saturday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.saturday_close)),
                        },
                        Sunday: {
                            open: convertTo12HourFormat(formatTime(responseData.sunday_open)),
                            close: convertTo12HourFormat(formatTime(responseData.sunday_close)),
                        },
                    });
                })
                .catch(error => {

                });
        }
    };

    const getEvents = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const getEventEndpoint = `/api/restaurants/events/`;
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + getEventEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const responseData = response.data || {};
                    setEventData(responseData);
                })
                .catch(error => {

                });
        }
    };

    const getRestaurantDetail = () => {
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
                    const responseData = response.data || [];
                    if (responseData.has_restaurant) {
                        setRestaurantDetails(responseData.restaurant_details);
                        console.log(responseData.restaurant_details);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        getTimings()
        getEvents()
        getRestaurantDetail()
    }, [])

    return (
        <div style={{ position: '', width: isSidebarOpen ? '64px' : '0', height: '100vh', transition: 'width 0.3s', zIndex: 2 }}>
            <button
                onClick={toggleSidebar}
                className="p-3 cursor-pointer"
                style={{ display: isSidebarOpen ? 'none' : 'block' }}
            >
                <HiMenu size={25} />
            </button>

            <div className={`border border-gray-300 flex-col ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden transition-all duration-300 bg-slate-50`} style={{ height: '100%' }}>
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
                        <span className={`text-[1rem] font-semibold whitespace-pre ${open ? "block" : "hidden"}`}>
                            {restaurantDetails.restaurant_name}
                        </span>
                    </div>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <div>
                                <p className="font-semibold text-gray-600 text-xs text-left pb-3">Opening Hours</p>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="text-xs">
                                    <span>Sunday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Sunday"]["open"]} - {openingHours["Sunday"]["close"]}</span>
                                </div>
                                <div className="text-xs">
                                    <span>Monday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Monday"]["open"]} - {openingHours["Monday"]["close"]}</span>
                                </div>
                                <div className="text-xs">
                                    <span>Tuesday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Tuesday"]["open"]} - {openingHours["Tuesday"]["close"]}</span>
                                </div>
                                <div className="text-xs">
                                    <span>Wednesday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Wednesday"]["open"]} - {openingHours["Wednesday"]["close"]}</span>
                                </div>
                                <div className="text-xs">
                                    <span>Thursday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Thursday"]["open"]} - {openingHours["Thursday"]["close"]}</span>
                                </div>
                                <div className="text-xs">
                                    <span>Friday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Friday"]["open"]} - {openingHours["Friday"]["close"]}</span>
                                </div>
                                <div className="text-xs">
                                    <span>Saturday</span>
                                </div>
                                <div className="text-xs">
                                    <span>{openingHours["Saturday"]["open"]} - {openingHours["Saturday"]["close"]}</span>
                                </div>
                            </div>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                    <div className='mt-[2rem] shadow-lg'>
                        <div className='text-xs text-white font-semibold bg-[#610C9F] p-3'>
                            <p>Upcoming Events</p>
                        </div>
                        <div className='bg-white text-xs h-40 overflow-auto'>
                            {eventData && eventData.map((event, index) => (
                                <div key={index} className='flex items-center gap-3 p-3 border-b border-gray-200'>
                                    <p className='border border-gray-300 rounded-full p-2 h-10 w-10 text-center flex items-center justify-center'>{formatDate(event.event_date)}</p>
                                    <p>{event.event_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center mt-[4rem] text-xs font-semibold gap-2'>
                        <div className='flex items-center justify-center gap-1'>
                            <FaLocationDot />
                            <p>{restaurantDetails.location} , {restaurantDetails.city}</p>
                        </div>
                        <p>{restaurantDetails.gst_no}</p>
                    </div>
                </Sidebar>
            </div>
            {children}
        </div>
    );
}

export default MySidebar;