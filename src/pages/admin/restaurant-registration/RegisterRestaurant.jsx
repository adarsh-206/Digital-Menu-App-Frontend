import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterRestaurant() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        restaurantName: '',
        contactNumber: '',
        gstIN: '',
        fssaiCode: '',
        location: '',
        city: '',
    });
    const [apiErrors, setApiErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userDetails, setUserDetails] = useState();
    const [isRegister, setIsRegister] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const getUserDetails = (e) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const endpoint = '/api/user/details';
        const accessToken = localStorage.getItem('access_token');

        axios.get(baseUrl + endpoint, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                setIsRegister(response.data)
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem('access_token');
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const userDetailsEndpoint = '/api/user/details';
            const restaurantEndpoint = '/api/restaurants/register';

            // Get user details
            const userResponse = await axios.get(baseUrl + userDetailsEndpoint, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            // Prepare restaurant data
            const restaurantData = {
                user: [userResponse.data.user_id],
                restaurant_name: formData.restaurantName,
                contact_number: formData.contactNumber,
                gst_no: formData.gstIN,
                fssai_code: formData.fssaiCode,
                location: formData.location,
                city: formData.city,
            };

            // Register the restaurant
            const restaurantResponse = await axios.post(baseUrl + restaurantEndpoint, restaurantData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            setIsSubmitted(true);
            navigate('/dashboard');
        } catch (error) {
            console.log("An error occurred:", error);
            // Handle errors or setApiErrors if needed
        }
    };

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className='min-h-screen w-screen'>
            <div className="flex flex-col items-center justify-center h-screen mx-4 sm:mx-0">
                <div className="bg-white p-5 sm:p-5 rounded-xl shadow-lg">
                    <div className="mb-5 text-xl sm:text-xl md:text-2xl">
                        <p className="text-black font-semibold text-center">Restaurant Registration</p>
                    </div>
                    <form className="w-64 max-w-screen-xl lg:w-96" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-slate-700 text-sm font-medium" htmlFor="restaurantName">Restaurant Name</label>
                            <input
                                className="w-full border-b border-gray-400 py-1.5 text-slate-400 text-xs bg-transparent focus:outline-none focus:border-black"
                                type="text"
                                id="restaurantName"
                                name="restaurantName"
                                value={formData.restaurantName}
                                onChange={handleInputChange}
                                placeholder='My Restaurant'
                            />
                            {/* {apiErrors.business_name && (
                                <p className="text-red-400 text-xs mt-1">{apiErrors.restaurantName[0] ? apiErrors.restaurantName[0] : ''}</p>
                            )} */}
                        </div>
                        <div className="mb-2">
                            <label className="block text-slate-700 text-sm font-medium" htmlFor="contactNumber">Contact Number</label>
                            <input
                                className="w-full border-b border-gray-400 py-1.5 text-slate-400 text-xs bg-transparent focus:outline-none focus:border-black"
                                type="text"
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                                placeholder='1234567890'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-slate-700 text-sm font-medium" htmlFor="gstIN">GST IN</label>
                            <input
                                className="w-full border-b border-gray-400 py-1.5 text-slate-400 text-xs bg-transparent focus:outline-none focus:border-black"
                                type="text"
                                id="gstIN"
                                name="gstIN"
                                value={formData.gstIN}
                                onChange={handleInputChange}
                                placeholder='GSTIN123456'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-slate-700 text-sm font-medium" htmlFor="fssaiCode">FSSAI Code</label>
                            <input
                                className="w-full border-b border-gray-400 py-1.5 text-slate-400 text-xs bg-transparent focus:outline-none focus:border-black"
                                type="text"
                                id="fssaiCode"
                                name="fssaiCode"
                                value={formData.fssaiCode}
                                onChange={handleInputChange}
                                placeholder='FSSAI123456'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-slate-700 text-sm font-medium" htmlFor="location">Location</label>
                            <input
                                className="w-full border-b border-gray-400 py-1.5 text-slate-400 text-xs bg-transparent focus:outline-none focus:border-black"
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder='USA'
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-slate-700 text-sm font-medium" htmlFor="city">City</label>
                            <input
                                className="w-full border-b border-gray-400 py-1.5 text-slate-400 text-xs bg-transparent focus:outline-none focus:border-black"
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder='New York'
                            />
                        </div>
                        <div className="flex justify-center mt-5">
                            <button className="py-2 px-4 rounded-md bg-black text-white text-sm">
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterRestaurant;