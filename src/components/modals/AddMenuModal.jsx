import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddMenuModal({ closeModal, onAddSuccess }) {
    const [menuName, setMenuName] = useState('');
    const [menuDescription, setMenuDescription] = useState('');
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        menuName: '',
        menuDescription: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newFormErrors = { ...formErrors };

        if (menuName.trim() === '') {
            newFormErrors.menuName = 'Please enter a menu name.';
            isValid = false;
        } else {
            newFormErrors.menuName = '';
        }

        if (menuDescription.trim() === '') {
            newFormErrors.menuDescription = 'Please enter a menu description.';
            isValid = false;
        } else {
            newFormErrors.menuDescription = '';
        }

        setFormErrors(newFormErrors);
        return isValid;
    };

    const handleAddMenu = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const userRestroEndpoint = `/api/user/has-restaurant`;
                const addMenuEndpoint = `/api/menus/`;
                const token = localStorage.getItem('access_token');

                if (token) {
                    const responseUser = await axios.get(baseUrl + userRestroEndpoint, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    const restaurantId = responseUser.data.restaurant_details.id;

                    const menuData = {
                        restaurant: restaurantId,
                        name: menuName,
                        menu_description: menuDescription,
                    };

                    const responseAddMenu = await axios.post(baseUrl + addMenuEndpoint, menuData, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (responseAddMenu) {
                        closeModal();
                        setMenuName('');
                        setMenuDescription('');
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
            <h2 className="text-xl font-semibold mb-4 text-center">Add your Menu</h2>
            <form onSubmit={handleAddMenu}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="menuName">
                        Menu Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="menuName"
                        type="text"
                        placeholder="Enter menu name"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                    />
                    {formErrors.menuName && <span className="error text-xs text-red-400">{formErrors.menuName}</span>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="menuDescription">
                        Menu Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="menuDescription"
                        placeholder="Enter menu description"
                        rows="4"
                        value={menuDescription}
                        onChange={(e) => setMenuDescription(e.target.value)}
                    />
                    {formErrors.menuDescription && <span className="error text-xs text-red-400">{formErrors.menuDescription}</span>}
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

export default AddMenuModal;