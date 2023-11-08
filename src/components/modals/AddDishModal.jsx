import React, { useState } from 'react';

function AddDishModal({ closeModal }) {
    const [dishName, setDishName] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishPrice, setDishPrice] = useState('');

    const handleAddDish = (e) => {
        e.preventDefault();
        closeModal();
        setDishName('');
        setDishDescription('');
        setDishPrice('');
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Add New Dish</h2>
            <form onSubmit={handleAddDish}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishName">
                        Dish Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishName"
                        type="text"
                        placeholder="Enter dish name"
                        value={dishName}
                        onChange={(e) => setDishName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishDescription">
                        Dish Description:
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishDescription"
                        placeholder="Enter dish description"
                        rows="4"
                        value={dishDescription}
                        onChange={(e) => setDishDescription(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="dishPrice">
                        Dish Price:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dishPrice"
                        type="text"
                        placeholder="Enter dish price"
                        value={dishPrice}
                        onChange={(e) => setDishPrice(e.target.value)}
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

export default AddDishModal;