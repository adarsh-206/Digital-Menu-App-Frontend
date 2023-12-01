import React, { useState } from 'react';
import axios from 'axios';

function AddSubCategoryModal({ closeModal, onAddSuccess, selectedSubCategoryId }) {
    const [subCategoryName, setSubCategoryName] = useState('');
    const [formErrors, setFormErrors] = useState({
        subCategoryName: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newFormErrors = { ...formErrors };

        if (subCategoryName.trim() === '') {
            newFormErrors.subCategoryName = 'Please enter a category name.';
            isValid = false;
        } else {
            newFormErrors.subCategoryName = '';
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    const handleAddSubCategory = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const userRestroEndpoint = `/api/user/has-restaurant`;
                const addSubCategoryEndpoint = `/api/categories/`;
                const token = localStorage.getItem('access_token');

                if (token) {
                    const responseUser = await axios.get(baseUrl + userRestroEndpoint, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    const restaurantId = responseUser.data.restaurant_details.id;

                    const subCategoryData = {
                        restaurant: restaurantId,
                        name: subCategoryName,
                        parent_category: selectedSubCategoryId,
                    };

                    const responseAddSubCategory = await axios.post(baseUrl + addSubCategoryEndpoint, subCategoryData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (responseAddSubCategory) {
                        closeModal();
                        setSubCategoryName('');
                        onAddSuccess()
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New SubCategory</h2>
            <form onSubmit={handleAddSubCategory}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="subCategoryName">
                        SubCategory Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="subCategoryName"
                        type="text"
                        placeholder="Enter subcategory name"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                    />
                    {formErrors.subCategoryName && <span className="error text-xs text-red-400">{formErrors.subCategoryName}</span>}
                </div>
                <div className="flex items-center justify-center gap-3">
                    <button
                        type="submit"
                        className="bg-yellow-300 hover:bg-yellow-500 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-yellow-300 hover:bg-yellow-500 text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div >
    );
}

export default AddSubCategoryModal;