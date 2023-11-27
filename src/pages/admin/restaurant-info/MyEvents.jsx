import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyEvents() {
    const [restaurantId, setRestaurantId] = useState();
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDate: ''
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
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const createEventEndpoint = `/api/restaurants/create/`;
        const token = localStorage.getItem('access_token');

        const eventsData = {
            restaurant: restaurantId,
            event_name: eventData.eventName,
            event_date: eventData.eventDate
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
                            eventDate: ''
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
        <div className='w-[50%] m-3 p-4 flex flex-col justify-center items-center h-[80vh] mx-auto'>
            <div className='bg-white p-5 rounded-lg'>
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-lg font-semibold ml-4">Upcoming Events</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventName">
                                Event Name
                            </label>
                            <input name='eventName' className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventName" type="text" placeholder="Sunday Special" value={eventData.eventName} onChange={handleEventChange} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="eventDate">
                                Event Date
                            </label>
                            <input name="eventDate" className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="eventDate" type="date" value={eventData.eventDate} onChange={handleEventChange} />
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
    )
}

export default MyEvents;