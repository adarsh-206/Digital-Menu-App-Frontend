import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { RxCross2 } from 'react-icons/rx';
import { HiMenu } from 'react-icons/hi';
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { GrNotes } from "react-icons/gr";
import { BiSolidPhoneCall } from "react-icons/bi";

const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);

    const options = {
        day: 'numeric',
        month: 'short',
    };

    return dateObject.toLocaleDateString('en-US', options);
};

const convertTo12HourFormat = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', options);
};

function UserSidebar({ children, eventData, openingHours, restaurantDetails }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                                    <SlCalender size={35} />
                                    <div>
                                        <p className='font-semibold'>{event.event_name}</p>
                                        <p className='text-[0.6rem]'>{formatDate(event.event_start_date)} - {formatDate(event.event_end_date)}</p>
                                        <p className='text-[0.6rem]'>{convertTo12HourFormat(event.event_start_time)} - {convertTo12HourFormat(event.event_end_time)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center mt-[4rem] text-xs font-semibold gap-2'>
                        <div className='flex items-center justify-center gap-1'>
                            <FaLocationDot />
                            <p className='whitespace-normal'>{restaurantDetails.location} , {restaurantDetails.city}</p>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <div className='flex items-center justify-center gap-1'>
                                <BiSolidPhoneCall />
                                <p>{restaurantDetails.contact_number}</p>
                            </div>
                            <div className='flex items-center justify-center gap-1'>
                                <GrNotes />
                                <p>{restaurantDetails.gst_no}</p>
                            </div>
                        </div>
                    </div>
                </Sidebar>
            </div>
            {children}
        </div>
    );
}

export default UserSidebar;