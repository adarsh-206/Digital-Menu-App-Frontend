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
    const [categories, setCategories] = useState({})
    const [subCategories, setSubCategories] = useState({})

    const getCategories = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const categoryListEndpoint = '/api/categories/';
        const token = localStorage.getItem('access_token')

        if (token) {
            axios.get(baseUrl + categoryListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setCategories(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const getSubCategories = (categoryId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const subCategoryListEndpoint = `/api/categories/${categoryId}/subcategories/`;
        const token = localStorage.getItem('access_token')

        if (token) {
            axios.get(baseUrl + subCategoryListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setSubCategories(response.data)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const { name, description, is_veg, price, category, subcategory, image } = dishDetail;

    const handleAddDish = async (e) => {
        e.preventDefault();
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const userRestroEndpoint = `/api/user/has-restaurant`;
            const addDishEndpoint = `/api/items/`;
            const token = localStorage.getItem('access_token');

            if (token) {
                const responseUser = await axios.get(baseUrl + userRestroEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const restaurantId = responseUser.data.restaurant_details.id;

                const formData = new FormData();
                formData.append('name', name);
                formData.append('description', description);
                formData.append('is_veg', is_veg);
                formData.append('price', price);
                formData.append('category', category);
                formData.append('subcategory', subcategory);
                formData.append('image', image);

                const responseAddDish = await axios.post(baseUrl + addDishEndpoint, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
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
    };

    // const handleCategoryChange = (e) => {
    //     const selectedCategory = e.target.value;
    //     setDishDetail({ ...dishDetail, category: selectedCategory });
    //     if (selectedCategory) {
    //         getSubCategories(selectedCategory);
    //     }
    // }

    useEffect(() => {
        getCategories()
        getSubCategories(categoryId)
    }, [])

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
                        value={name}
                        onChange={(e) => setDishDetail({ ...dishDetail, name: e.target.value })}
                        required
                    />
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
                        value={price}
                        onChange={(e) => setDishDetail({ ...dishDetail, price: e.target.value })}
                        required
                    />
                </div>
                {/* <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishCategory">
                        Category:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishCategory"
                        value={category}
                        onChange={handleCategoryChange}
                        required
                    >
                        <option value={categoryId}>Select Category</option>
                        {Array.isArray(categories) && categories.length !== 0 ? (
                            categories.map((category) => (
                                <option key={category.id} value={categoryId}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No Categories Available
                            </option>
                        )}
                    </select>
                </div> */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishSubcategory">
                        Subcategory:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishSubcategory"
                        value={subcategory}
                        onChange={(e) => setDishDetail({ ...dishDetail, subcategory: e.target.value })}
                        required
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
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Vegetarian:
                    </label>
                    <div className="flex items-center gap-3">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={is_veg}
                                onChange={(e) => setDishDetail({ ...dishDetail, is_veg: e.target.checked })}
                            />
                            <span className="ml-2">Veg</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={!is_veg}
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
                        value={description}
                        onChange={(e) => setDishDetail({ ...dishDetail, description: e.target.value })}
                        required
                    />
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
                        required
                    />
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