import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mobileNumber: '',
        email: '',
        gstIN: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [apiErrors, setApiErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            mobile_number: formData.mobileNumber,
            email: formData.email,
            gst_no: formData.gstIN,
            password: formData.password,
        };

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const endpoint = '/api/user/register';

        axios.post(baseUrl + endpoint, userData)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access_token)
                setIsSubmitted(true);
                navigate('/dashboard');
            })
            .catch((error) => {
                setApiErrors(error.response.data)
            });
    };

    return (
        <div className='bg-myColor1 min-h-screen w-screen'>
            <div className="flex flex-col items-center justify-center h-screen mx-4 sm:mx-0">
                <div className="bg-myColor2a p-5 sm:p-5 rounded-xl">
                    <div className="mb-2 text-xl sm:text-xl md:text-2xl">
                        <p className="text-white font-semibold text-center">Sign Up</p>
                    </div>
                    <form className="w-64 max-w-screen-xl lg:w-96" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-white text-sm font-medium" htmlFor="mobileNumber">Mobile Number</label>
                            <input
                                className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                                type="text"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                            />
                            {apiErrors.mobile_number && (
                                <p className="text-red-400 text-xs mt-1">{apiErrors.mobile_number[0] ? apiErrors.mobile_number : ''}</p>
                            )}
                        </div>
                        <div className="mb-2">
                            <label className="block text-white text-sm font-medium" htmlFor="email">Email Address (Optional)</label>
                            <input
                                className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {apiErrors.email && (
                                <p className="text-red-400 text-xs mt-1">{apiErrors.email[0] ? apiErrors.email[0] : ''}</p>
                            )}
                        </div>
                        <div className="mb-2">
                            <label className="block text-white text-sm font-medium" htmlFor="gstIN">GST IN</label>
                            <input
                                className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                                type="text"
                                id="gstIN"
                                name="gstIN"
                                value={formData.gstIN}
                                onChange={handleInputChange}
                            />
                            {apiErrors.gst_no && (
                                <p className="text-red-400 text-xs mt-1">{apiErrors.gst_no[0] ? apiErrors.gst_no[0] : ''}</p>
                            )}
                        </div>
                        <div className="mb-2">
                            <label className="block text-white text-sm font-medium" htmlFor="password">Password</label>
                            <input
                                className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {apiErrors.password && (
                                <p className="text-red-400 text-xs mt-1">{apiErrors.password[0] ? apiErrors.password[0] : ''}</p>
                            )}
                        </div>
                        <div className="flex justify-center mt-3">
                            <button className="py-2 px-4 rounded-md bg-myColor3 hover:bg-myColor2b text-white text-sm">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p className="text-white text-center text-xs mt-1">
                        Already have an account?
                        <span className="font-semibold">
                            <Link to="/login"> Login</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;