import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email_or_mobile_number: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({
        email_or_mobile_number: '',
        password: '',
    });
    const [inValidCredentials, setInvalidCredentials] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        const newFormErrors = { ...formErrors };

        if (formData.email_or_mobile_number.trim() === '') {
            newFormErrors.email_or_mobile_number = 'Please enter a mobile number.';
            isValid = false;
        } else {
            newFormErrors.email_or_mobile_number = '';
            isValid = true;
        }

        if (formData.password.trim() === '') {
            newFormErrors.password = 'Please enter a password.';
            isValid = false;
        } else {
            newFormErrors.password = '';
            isValid = true;
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                email_or_mobile_number: formData.email_or_mobile_number,
                password: formData.password,
            };

            const baseUrl = import.meta.env.VITE_BASE_URL;
            const loginEndpoint = '/api/user/login';

            try {
                const response = await axios.post(baseUrl + loginEndpoint, userData);

                localStorage.setItem('access_token', response.data.access_token);

                const checkRegistrationResponse = await axios.get(baseUrl + '/api/user/has-restaurant', {
                    headers: {
                        'Authorization': `Bearer ${response.data.access_token}`,
                    },
                });

                if (checkRegistrationResponse.data.has_restaurant === true) {
                    navigate('/dashboard');
                } else {
                    navigate('/register-restauarant');
                }
            } catch (error) {
                setInvalidCredentials(error.response.data.error);
            }
        }
    };

    return (
        <div className='bg-myColor1 min-h-screen w-screen'>
            <div className="flex flex-col items-center justify-center h-screen mx-4 sm:mx-0">
                <div className="bg-myColor2a p-3 sm:p-7 rounded-xl">
                    <div className="mb-3 text-xl sm:text-2xl md:text-3xl">
                        <p className="text-white font-semibold text-center">Login</p>
                    </div>
                    <form className="w-64 max-w-screen-xl lg:w-96" onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block text-white text-sm font-medium" htmlFor="email_or_mobile_number">Mobile Number/Email</label>
                            <input
                                className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                                type="text"
                                id="email_or_mobile_number"
                                name="email_or_mobile_number"
                                value={formData.email_or_mobile_number}
                                onChange={handleInputChange}
                            />
                            {formErrors.email_or_mobile_number && <span className="error text-xs text-red-400">{formErrors.email_or_mobile_number}</span>}
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
                            {formErrors.password && <span className="error text-xs text-red-400">{formErrors.password}</span>}
                        </div>
                        {inValidCredentials && <p className='error text-xs text-red-400'>{inValidCredentials}</p>}
                        <div className="flex justify-center mt-4">
                            <button className="py-2 px-4 rounded-md bg-myColor3 hover:bg-myColor2b text-white text-sm">
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-white text-center text-xs mt-2">
                        Don't have an account?
                        <span className="font-semibold">
                            <Link to="/signup"> Sign Up</Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;