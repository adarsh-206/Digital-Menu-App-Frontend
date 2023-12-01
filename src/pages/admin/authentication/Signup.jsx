import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        mobileNumber: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        mobileNumber: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        const newFormErrors = { ...formErrors };

        if (formData.mobileNumber.trim() === '') {
            newFormErrors.mobileNumber = 'Please enter a mobile number.';
            isValid = false;
        } else {
            const mobileNumberRegex = /^\d{10}$/;
            if (!mobileNumberRegex.test(formData.mobileNumber)) {
                newFormErrors.mobileNumber = 'Please enter a valid 10 digit mobile number.';
                isValid = false;
            } else {
                newFormErrors.mobileNumber = '';
            }
        }

        if (formData.email.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newFormErrors.email = 'Please enter a valid email address.';
                isValid = false;
            } else {
                newFormErrors.email = '';
            }
        }

        if (formData.password.trim() === '' || formData.password.length < 6) {
            newFormErrors.password = 'Please enter a password.';
            isValid = false;
        } else {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;
            if (!passwordRegex.test(formData.password)) {
                newFormErrors.password = 'Please enter a valid password.';
                isValid = false;
            } else {
                newFormErrors.password = '';
            }
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                mobile_number: formData.mobileNumber,
                email: formData.email.trim() === "" ? null : formData.email,
                password: formData.password,
            };

            const baseUrl = import.meta.env.VITE_BASE_URL;
            const endpoint = '/api/user/register';

            axios.post(baseUrl + endpoint, userData)
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access_token)
                    navigate('/register-restauarant');
                })
                .catch((error) => {
                    if (error.response.data.mobile_number && error.response.data.mobile_number.length) {
                        setFormErrors({
                            mobileNumber: 'Mobile Number is already in use.'
                        });
                    }

                    if (error.response.data.email && error.response.data.email.length) {
                        setFormErrors({
                            email: 'Email Address is already in use.'
                        });
                    }

                });
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
                            />
                            {formErrors.mobileNumber && <span className="error text-xs text-red-400">{formErrors.mobileNumber}</span>}
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
                            {formErrors.email && <span className="error text-xs text-red-400">{formErrors.email}</span>}
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
                            {formErrors.password && <span className="error text-xs text-red-400">Password must be at least 6 characters with one uppercase letter and a special symbol.</span>}
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