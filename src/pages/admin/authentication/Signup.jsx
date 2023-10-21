import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessName: '',
        gstIN: '',
        contactNo: '',
        registration: '',
        speciality: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.businessName) {
            newErrors.businessName = 'Business Name is required';
        }
        if (!formData.gstIN) {
            newErrors.gstIN = 'GST IN is required';
        }
        if (!formData.contactNo) {
            newErrors.contactNo = 'Contact No is required';
        }
        if (!formData.registration) {
            newErrors.registration = 'Registration Date is required';
        }
        if (!formData.speciality) {
            newErrors.speciality = 'Speciality is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitted(true);
            navigate('/dashboard');
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen mx-4 sm:mx-0">
            <div className="bg-myColor2a p-5 sm:p-5 rounded-xl">
                <div className="mb-2 text-xl sm:text-xl md:text-2xl">
                    <p className="text-white font-semibold text-center">Sign Up</p>
                </div>
                <form className="w-64 max-w-screen-xl lg:w-96" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-white text-sm font-medium" htmlFor="businessName">Business Name</label>
                        <input
                            className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                            type="text"
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleInputChange}
                        />
                        {errors.businessName && (
                            <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
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
                        {errors.gstIN && (
                            <p className="text-red-500 text-xs mt-1">{errors.gstIN}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-white text-sm font-medium" htmlFor="contactNo">Contact No</label>
                        <input
                            className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                            type="text"
                            id="contactNo"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleInputChange}
                        />
                        {errors.contactNo && (
                            <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-white text-sm font-medium" htmlFor="registration">Registration Date</label>
                        <input
                            className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                            type="text"
                            id="registration"
                            name="registration"
                            value={formData.registration}
                            onChange={handleInputChange}
                        />
                        {errors.registration && (
                            <p className="text-red-500 text-xs mt-1">{errors.registration}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-white text-sm font-medium" htmlFor="speciality">Speciality</label>
                        <input
                            className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus-border-white"
                            type="text"
                            id="speciality"
                            name="speciality"
                            value={formData.speciality}
                            onChange={handleInputChange}
                        />
                        {errors.speciality && (
                            <p className="text-red-500 text-xs mt-1">{errors.speciality}</p>
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
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>
                    <div className="mb-2">
                        <label className="block text-white text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="w-full border-b border-gray-400 py-0.5 text-white bg-transparent focus:outline-none focus:border-white"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
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
    );
}

export default Signup;