import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mobileNumber: '',
        email: '',
        gstIN: '',
        userId: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const isValidate = () => {
        const errors = {};

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const mobilePattern = /^\d{10}$/;

        if (formData.email && !emailPattern.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!mobilePattern.test(formData.mobileNumber)) {
            errors.mobileNumber = 'Invalid mobile number';
        }

        return errors;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = isValidate();

        if (Object.keys(formErrors).length === 0) {
            const userData = {
                mobile_number: formData.mobileNumber,
                email: formData.email,
                gst_no: formData.gstIN,
                user_name: formData.userId,
                password: formData.password,
            };

            const baseUrl = "https://tensormenuapp.onrender.com";
            const endpoint = '/api/user/register';

            axios.post(baseUrl + endpoint, userData)
                .then((response) => {
                    setIsSubmitted(true);
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setErrors(formErrors);
        }
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
                                required
                            />
                            {errors.mobileNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
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
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
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
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-white text-sm font-medium" htmlFor="userId">User ID</label>
                            <input
                                className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                                type="text"
                                id="userId"
                                name="userId"
                                value={formData.userId}
                                onChange={handleInputChange}
                                required
                            />
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
                                required
                            />
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