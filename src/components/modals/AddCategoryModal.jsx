import React, { useState } from 'react';
import axios from 'axios';

function AddCategoryModal({ closeModal, onAddSuccess }) {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryId, setCategoryId] = useState();

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const userRestroEndpoint = `/api/user/has-restaurant`;
            const addCategoryEndpoint = `/api/categories/`;
            const token = localStorage.getItem('access_token');

            if (token) {
                const responseUser = await axios.get(baseUrl + userRestroEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const restaurantId = responseUser.data.restaurant_details.id;

                const categoryData = {
                    restaurant: restaurantId,
                    name: categoryName,
                    description: categoryDescription,
                    parent_category: null,
                };

                const responseAddCategory = await axios.post(baseUrl + addCategoryEndpoint, categoryData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (responseAddCategory) {
                    closeModal();
                    setCategoryId(responseAddCategory.data.id);
                    onAddSuccess();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Category</h2>
            <form onSubmit={handleAddCategory}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="categoryName">
                        Category Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="categoryName"
                        type="text"
                        placeholder="Enter category name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="categoryDescription">
                        Category Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="categoryDescription"
                        placeholder="Enter category description"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                    />
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
        </div>
    );
}

export default AddCategoryModal;