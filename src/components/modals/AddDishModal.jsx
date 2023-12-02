import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddDishModal({ closeModal, onAddSuccess, categoryId, refresh, setRefresh }) {
    const [dishDetail, setDishDetail] = useState({
        name: '',
        description: '',
        is_veg: false,
        price: '',
        category: categoryId,
        subcategory: '',
        image: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const getCategories = async () => {
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const categoryListEndpoint = '/api/categories/';
            const token = localStorage.getItem('access_token');

            if (token) {
                const response = await axios.get(baseUrl + categoryListEndpoint, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                setCategories(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getSubCategories = async (categoryId) => {
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const subCategoryListEndpoint = `/api/categories/${categoryId}/subcategories/`;
            const token = localStorage.getItem('access_token');

            if (token) {
                const response = await axios.get(baseUrl + subCategoryListEndpoint, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                setSubCategories(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newFormErrors = { name: '', description: '', price: '', image: '' };

        if (dishDetail.name.trim() === '') {
            newFormErrors.name = 'Please enter a dish name.';
            isValid = false;
        } else {
            newFormErrors.name = '';
        }

        if (dishDetail.description.trim() === '') {
            newFormErrors.description = 'Please enter a description name.';
            isValid = false;
        } else {
            newFormErrors.description = '';
        }

        if (dishDetail.price.trim() === '') {
            newFormErrors.price = 'Please enter a price.';
            isValid = false;
        } else {
            newFormErrors.price = '';
        }

        if (dishDetail.image === '') {
            newFormErrors.image = 'Please choose an image.';
            isValid = false;
        } else {
            newFormErrors.image = '';
        }

        if (dishDetail.subcategory === '') {
            newFormErrors.subcategory = 'Please choose a subcategory.';
            isValid = false;
        } else {
            newFormErrors.subcategory = '';
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    const handleAddDish = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const userRestroEndpoint = '/api/user/has-restaurant';
                const addDishEndpoint = '/api/items/';
                const token = localStorage.getItem('access_token');

                if (token) {
                    const responseUser = await axios.get(baseUrl + userRestroEndpoint, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });

                    const restaurantId = responseUser.data.restaurant_details.id;

                    const formData = new FormData();
                    formData.append('name', dishDetail.name);
                    formData.append('description', dishDetail.description);
                    formData.append('is_veg', dishDetail.is_veg);
                    formData.append('price', dishDetail.price);
                    formData.append('category', dishDetail.category);
                    formData.append('subcategory', dishDetail.subcategory);
                    formData.append('image', dishDetail.image);

                    const responseAddDish = await axios.post(baseUrl + addDishEndpoint, formData, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });

                    if (responseAddDish) {
                        onAddSuccess();
                        closeModal();
                        setDishDetail({
                            name: '',
                            description: '',
                            is_veg: false,
                            price: '',
                            category: '',
                            subcategory: '',
                            image: '',
                        });
                        setRefresh((prevRefresh) => !prevRefresh);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        getCategories();
        getSubCategories(categoryId);
    }, [categoryId]);

    return (
        <div className="p-2">
            <h2 className="text-xl font-semibold mb-2 text-center">Add New Dish</h2>
            <form onSubmit={handleAddDish} className="grid grid-cols-2 gap-3" encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishName">
                        Dish Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishName"
                        type="text"
                        placeholder="Enter dish name"
                        value={dishDetail.name}
                        onChange={(e) => setDishDetail({ ...dishDetail, name: e.target.value })}

                    />
                    {formErrors.name && <span className="error text-xs text-red-400">{formErrors.name}</span>}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishPrice">
                        Dish Price:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishPrice"
                        type="text"
                        placeholder="Enter dish price"
                        value={dishDetail.price}
                        onChange={(e) => setDishDetail({ ...dishDetail, price: e.target.value })}

                    />
                    {formErrors.price && <span className="error text-xs text-red-400">{formErrors.price}</span>}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishSubcategory">
                        Subcategory:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishSubcategory"
                        value={dishDetail.subcategory}
                        onChange={(e) => setDishDetail({ ...dishDetail, subcategory: e.target.value })}

                    >
                        <option value="">Select Subcategory</option>
                        {Array.isArray(subCategories) && subCategories.length !== 0 ? (
                            subCategories.map((subCategory) => (
                                <option key={subCategory.id} value={subCategory.id}>
                                    {subCategory.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No Options.
                            </option>
                        )}
                    </select>
                    {formErrors.subcategory && <span className="error text-xs text-red-400">{formErrors.subcategory}</span>}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Vegetarian:
                    </label>
                    <div className="flex items-center gap-3">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={dishDetail.is_veg}
                                onChange={(e) => setDishDetail({ ...dishDetail, is_veg: e.target.checked })}
                            />
                            <span className="ml-2">Veg</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={!(dishDetail.is_veg)}
                                onChange={(e) => setDishDetail({ ...dishDetail, is_veg: !e.target.checked })}
                            />
                            <span className="ml-2">Non-veg</span>
                        </label>
                    </div>
                </div>
                <div className="col-span-2 mb-3">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishDescription">
                        Dish Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishDescription"
                        placeholder="Enter dish description"
                        rows="4"
                        value={dishDetail.description}
                        onChange={(e) => setDishDetail({ ...dishDetail, description: e.target.value })}
                    />
                    {formErrors.description && <span className="error text-xs text-red-400">{formErrors.description}</span>}
                </div>
                <div className="col-span-2 mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishImage">
                        Dish Image:
                    </label>
                    <input
                        type="file"
                        id="dishImage"
                        accept="image/*"
                        onChange={(e) => setDishDetail({ ...dishDetail, image: e.target.files[0] })}

                    />
                    {formErrors.image && <span className="error text-xs text-red-400">{formErrors.image}</span>}
                </div>
                <div className="col-span-2 flex items-center justify-center gap-3">
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

export default AddDishModal;