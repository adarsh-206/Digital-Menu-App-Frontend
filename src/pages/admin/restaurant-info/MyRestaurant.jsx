import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function MyRestaurant() {
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [restaurantId, setRestaurantId] = useState();
    const [currentStep, setCurrentStep] = useState(1);
    const [openingHours, setOpeningHours] = useState({
        Monday: { open: '', close: '' },
        Tuesday: { open: '', close: '' },
        Wednesday: { open: '', close: '' },
        Thursday: { open: '', close: '' },
        Friday: { open: '', close: '' },
        Saturday: { open: '', close: '' },
        Sunday: { open: '', close: '' },
    });
    const [formData, setFormData] = useState({
        restaurantName: '',
        contactNumber: '',
        gstIN: '',
        fssaiCode: '',
        location: '',
        city: '',
    });

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
                        setRestaurantId(responseData.restaurant_details.id);
                        setFormData({
                            restaurantName: responseData.restaurant_details.restaurant_name,
                            contactNumber: responseData.restaurant_details.contact_number,
                            gstIN: responseData.restaurant_details.gst_no,
                            fssaiCode: responseData.restaurant_details.fssai_code,
                            location: responseData.restaurant_details.location,
                            city: responseData.restaurant_details.city,
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const updateRestaurantDetails = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const updateRestaurantEndpoint = `/api/restaurants/detail/${restaurantId}`;
        const userDetailsEndpoint = '/api/user/details';
        const token = localStorage.getItem('access_token');

        const userResponse = await axios.get(baseUrl + userDetailsEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const restaurantData = {
            restaurant_name: formData.restaurantName,
            gst_no: formData.gstIN,
            fssai_code: formData.fssaiCode,
            contact_number: formData.contactNumber,
            location: formData.location,
            city: formData.city,
        };

        if (token) {
            axios.put(baseUrl + updateRestaurantEndpoint, restaurantData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {

                })
                .catch(error => {

                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    }

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleDateInputChange = (day, field, value) => {
        setOpeningHours(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentStep === 1) {
            await updateRestaurantDetails();
        } else if (currentStep === 2) {
            await setTimings();
        }
    };

    const setTimings = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const createEventEndpoint = `/api/restaurants/opening-hours/create/`;
        const token = localStorage.getItem('access_token');

        const restroTimings = {
            "monday_open": openingHours["Monday"]["open"] ? openingHours["Monday"]["open"] : "11:00",
            "monday_close": openingHours["Monday"]["close"] ? openingHours["Monday"]["close"] : "23:00",
            "tuesday_open": openingHours["Tuesday"]["open"] ? openingHours["Tuesday"]["open"] : "11:00",
            "tuesday_close": openingHours["Tuesday"]["close"] ? openingHours["Tuesday"]["close"] : "23:00",
            "wednesday_open": openingHours["Wednesday"]["open"] ? openingHours["Wednesday"]["open"] : "11:00",
            "wednesday_close": openingHours["Wednesday"]["close"] ? openingHours["Wednesday"]["close"] : "23:00",
            "thursday_open": openingHours["Thursday"]["open"] ? openingHours["Thursday"]["open"] : "11:00",
            "thursday_close": openingHours["Thursday"]["close"] ? openingHours["Thursday"]["close"] : "23:00",
            "friday_open": openingHours["Friday"]["open"] ? openingHours["Friday"]["open"] : "11:00",
            "friday_close": openingHours["Friday"]["close"] ? openingHours["Friday"]["close"] : "23:00",
            "saturday_open": openingHours["Saturday"]["open"] ? openingHours["Saturday"]["open"] : "11:00",
            "saturday_close": openingHours["Saturday"]["close"] ? openingHours["Saturday"]["close"] : "23:00",
            "sunday_open": openingHours["Sunday"]["open"] ? openingHours["Sunday"]["open"] : "11:00",
            "sunday_close": openingHours["Sunday"]["close"] ? openingHours["Sunday"]["close"] : "23:00"
        };

        if (token) {
            axios.post(baseUrl + createEventEndpoint, restroTimings, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {

                })
                .catch(error => {

                });
        }
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
                    setOpeningHours({
                        Monday: {
                            open: formatTime(responseData.monday_open),
                            close: formatTime(responseData.monday_close),
                        },
                        Tuesday: {
                            open: formatTime(responseData.tuesday_open),
                            close: formatTime(responseData.tuesday_close),
                        },
                        Wednesday: {
                            open: formatTime(responseData.wednesday_open),
                            close: formatTime(responseData.wednesday_close),
                        },
                        Thursday: {
                            open: formatTime(responseData.thursday_open),
                            close: formatTime(responseData.thursday_close),
                        },
                        Friday: {
                            open: formatTime(responseData.friday_open),
                            close: formatTime(responseData.friday_close),
                        },
                        Saturday: {
                            open: formatTime(responseData.saturday_open),
                            close: formatTime(responseData.saturday_close),
                        },
                        Sunday: {
                            open: formatTime(responseData.sunday_open),
                            close: formatTime(responseData.sunday_close),
                        },
                    });
                })
                .catch(error => {

                });
        }
    };

    useEffect(() => {
        getRestaurantDetail()
        getTimings()
    }, []);

    return (
        <div className='w-[50%] m-3 p-4 flex flex-col justify-center items-center h-[80vh] mx-auto'>
            {currentStep === 1 && (
                <div className='bg-white p-5 rounded-lg'>
                    <div className="flex items-center justify-center mb-6">
                        <h1 className="text-lg font-semibold ml-4">Restaurant Details</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="restaurantName">
                                    Restaurant Name
                                </label>
                                <input name="restaurantName" className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="restaurantName" type="text" placeholder="My Restaurant" value={formData.restaurantName} onChange={handleInputChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gstIN">
                                    GST Number
                                </label>
                                <input name="gstIN" className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="gstNo" type="text" placeholder="GSTIN01234" value={formData.gstIN} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fssaiCode">
                                    Fssai Code
                                </label>
                                <input name="fssaiCode" className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="fssaiCode" type="text" placeholder="FSSAI12345" value={formData.fssaiCode} onChange={handleInputChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contactNumber">
                                    Contact Number
                                </label>
                                <input name="contactNumber" className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="contactNumber" type="text" placeholder="1234567890" value={formData.contactNumber} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                                    City
                                </label>
                                <input name="city" className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city" type="text" placeholder="New York" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="location">
                                    Location
                                </label>
                                <input name='location' className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="location" type="text" placeholder="123, Laurence Street" value={formData.location} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='flex justify-center gap-4'>
                            <button type='submit' className='bg-[#940B92] text-white p-2 rounded-lg cursor-pointer'>
                                Save Changes
                            </button>
                            <button type='button' className='bg-[#940B92] text-white p-2 px-4 rounded-lg cursor-pointer' onClick={handleNextStep}>
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {currentStep === 2 && (
                <div className='bg-white p-5 rounded-lg'>
                    <div className="flex items-center justify-center mb-6">
                        <h1 className="text-lg font-semibold ml-4">Set Opening Hours</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {DaysOfWeek.map(day => (
                                <div key={day} className="mb-4">
                                    <label className="block text-sm font-bold mb-2" htmlFor={`${day}-open`}>{day}</label>
                                    <div className="flex items-center">
                                        <input
                                            className="appearance-none w-full sm:w-1/2 py-1 px-3 mr-2 leading-tight border border-gray-300 text-gray-500 rounded-sm focus:outline-none focus:border-gray-500"
                                            type="time"
                                            id={`${day}-open`}
                                            value={openingHours[day].open}
                                            onChange={(e) => handleDateInputChange(day, 'open', e.target.value)}
                                        />
                                        <span className="hidden sm:inline-block mr-2">to</span>
                                        <input
                                            className="appearance-none w-full sm:w-1/2 py-1 px-3 border border-gray-300 text-gray-500 rounded-sm leading-tight focus:outline-none focus:border-gray-500"
                                            type="time"
                                            id={`${day}-close`}
                                            value={openingHours[day].close}
                                            onChange={(e) => handleDateInputChange(day, 'close', e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center gap-2">
                            <button type="submit" className="bg-[#940B92] text-white py-2 px-4 rounded-lg cursor-pointer" onClick={handlePrevStep}>
                                Prev
                            </button>
                            <button type='submit' className='bg-[#940B92] text-white p-2 rounded-lg cursor-pointer'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default MyRestaurant