import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SlCalender } from "react-icons/sl";

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

function MyEvents() {
    const [restaurantId, setRestaurantId] = useState();
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [eventData, setEventData] = useState({
        eventName: '',
        eventStartDate: new Date().toISOString().split('T')[0],
        eventEndDate: new Date().toISOString().split('T')[0],
        eventStartTime: '11:00',
        eventEndTime: '23:00'
    });

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
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
                        setRestaurantId(responseData.restaurant_details.id);
                        getEvents(responseData.restaurant_details.gst_no);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const getEvents = async (restaurantGstNo) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const getEventEndpoint = `/api/restaurants/events/${restaurantGstNo}`;
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + getEventEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const responseData = response.data || {};
                    setUpcomingEvents(responseData);
                })
                .catch(error => {

                });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const createEventEndpoint = `/api/restaurants/events/`;
        const token = localStorage.getItem('access_token');

        const eventsData = {
            restaurant: restaurantId,
            event_name: eventData.eventName,
            event_start_date: eventData.eventStartDate,
            event_end_date: eventData.eventEndDate,
            event_start_time: eventData.eventStartTime,
            event_end_time: eventData.eventEndTime
        };

        if (token) {
            axios.post(baseUrl + createEventEndpoint, eventsData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    if (response) {
                        setEventData({
                            eventName: '',
                            eventStartDate: new Date().toISOString().split('T')[0],
                            eventEndDate: new Date().toISOString().split('T')[0],
                            eventStartTime: '11:00',
                            eventEndTime: '23:00'
                        })
                    }
                })
                .catch(error => {

                });
        }
    };

    useEffect(() => {
        getRestaurantDetail()
    }, []);

    return (

        <div className="flex flex-col md:flex-row">
            {/* Register Event */}
            <div className="flex-shrink-0 w-full md:w-1/2 p-4">
                <div className='bg-white p-5 rounded-lg shadow-lg'>
                    <div className="flex items-center justify-center mb-6">
                        <h1 className="text-lg font-semibold ml-4">Register Event</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-8">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventName">
                                    Event Name
                                </label>
                                <input name='eventName' className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventName" type="text" placeholder='Enter Event Name' value={eventData.eventName} onChange={handleEventChange} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-8">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventStartDate">
                                    Event Start Date
                                </label>
                                <input name='eventStartDate' className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventStartDate" type="date" value={eventData.eventStartDate} onChange={handleEventChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-8 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventEndDate">
                                    Event End Date
                                </label>
                                <input name="eventEndDate" className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventEndDate" type="date" value={eventData.eventEndDate} onChange={handleEventChange} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-8">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventStartTime">
                                    Event Start Time
                                </label>
                                <input name='eventStartTime' className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventStartTime" type="time" value={eventData.eventStartTime} onChange={handleEventChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventEndTime">
                                    Event End Time
                                </label>
                                <input name="eventEndTime" className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventEndTime" type="time" value={eventData.eventEndTime} onChange={handleEventChange} />
                            </div>
                        </div>
                        <div className='flex justify-center gap-4'>
                            <button type='submit' className='bg-[#940B92] text-white p-2 rounded-lg cursor-pointer'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="flex-shrink-0 w-full md:w-1/2 p-4">
                <div className='bg-white p-2 rounded-lg shadow-lg'>
                    <div className='p-2 text-lg font-bold text-center'>
                        <p>Upcoming Events</p>
                    </div>
                    {upcomingEvents && upcomingEvents.map((event, index) => (
                        <div key={index} className="flex justify-between items-center p-4 gap-4 border-b">
                            <SlCalender size={35} />
                            <div className='flex flex-1 justify-between items-center'>
                                <h2 className="text-sm font-semibold">{event.event_name}</h2>
                                <p className='text-xs'>{formatDate(event.event_start_date)} - {formatDate(event.event_end_date)}</p>
                                <p className='text-xs'>{convertTo12HourFormat(event.event_start_time)} - {convertTo12HourFormat(event.event_end_time)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyEvents;