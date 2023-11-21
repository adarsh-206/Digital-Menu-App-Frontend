import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import AddDishModal from '../../../components/modals/AddDishModal';
import Modal from '../../../components/modals/FormModal';

function ItemCard({ category, onAddSuccess, refresh, setRefresh }) {
    const [subCategories, setSubCategories] = useState({});
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [menuId, setMenuId] = useState();
    const [menuItems, setMenuItems] = useState([]);
    const [refreshed, setRefreshed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAddDishModalOpen, setAddDishModalOpen] = useState(false);

    const getSubCategories = (category) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const subCategoryListEndpoint = `/api/categories/${category}/subcategories/`;
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + subCategoryListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setSubCategories(response.data);
                    console.log("ooooooo", response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const getMenus = async () => {
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const menuListEndpoint = `/api/menus/`;
            const token = localStorage.getItem('access_token');

            if (token) {
                const response = await axios.get(baseUrl + menuListEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.data.length > 0) {
                    setMenuId(response.data[0].id);
                    setMenuItems(response.data[0].menu_items.map((item) => {
                        return item.item
                    }))
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const addItemToMenu = async (itemId) => {
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const addItemToMenuEndpoint = `/api/menu-items/`;
            const token = localStorage.getItem('access_token');

            const itemData = {
                menu: menuId,
                item: itemId,
            };

            if (token) {
                const response = await axios.post(baseUrl + addItemToMenuEndpoint, itemData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response)
                    setRefreshed((prevRefreshed) => !prevRefreshed);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeItemFromMenu = async (itemId) => {
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const removeItemFromMenuEndpoint = `/api/menus/${menuId}/remove-item/${itemId}/`;
            const token = localStorage.getItem('access_token');

            if (token) {
                const response = await axios.delete(baseUrl + removeItemFromMenuEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response) {
                    setRefreshed((prevRefreshed) => !prevRefreshed);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (itemId) => {
        setLoading(true)
        try {
            const baseUrl = import.meta.env.VITE_BASE_URL;
            const deleteItemEndpoint = `/api/items/${itemId}/`;
            const token = localStorage.getItem('access_token');

            if (token) {
                const response = await axios.delete(baseUrl + deleteItemEndpoint, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response) {
                    setRefreshed(prevRefreshed => !prevRefreshed);
                    onAddSuccess()
                    setLoading(false)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [addDishCategoryId, setAddDishCategoryId] = useState()
    const openDishModal = (categoryId) => {
        setAddDishCategoryId(categoryId)
        setAddDishModalOpen(true);
    };

    const closeDishModal = () => {
        setAddDishModalOpen(false);
        setRefresh((prevRefresh) => !prevRefresh);
        getSubCategories(categoryId)
    };

    const handleAddSuccess = () => {

    };

    useEffect(() => {
        getSubCategories(category);
        getMenus();
    }, [])

    useEffect(() => {
        getSubCategories(category);
        getMenus();
    }, [refreshed, category, refresh])

    return (
        <>
            {
                loading ? (
                    <div className="flex justify-center items-center">
                        <FadeLoader color={'#36D7B7'} loading={loading} size={50} />
                    </div>
                ) : (
                    <>
                        {
                            Array.isArray(subCategories) && subCategories.length !== 0 ? (
                                subCategories.map((subCategory, index) => (
                                    <div key={index}>
                                        {subCategory.name &&
                                            <div className='flex items-center'>
                                                <p className='px-4 text-xl font-bold'>{subCategory.name}</p>
                                                <button onClick={() => openDishModal(subCategory.parent_category)} className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs py-1 px-2 rounded-lg">
                                                    Add Dish +
                                                </button>
                                            </div>}
                                        <div className="flex flex-wrap">
                                            {Array.isArray(subCategory.items) && subCategory.items.length !== 0 ? (
                                                subCategory.items.map((item, itemIndex) => (
                                                    <div key={itemIndex} className="max-w-2xl w-80 rounded-xl overflow-hidden shadow-xl m-3 flex bg-white items-center">
                                                        <img className="w-2/5 h-32 object-cover rounded-xl p-2" src={item.image} alt={item.name} />
                                                        <div className="w-2/3 px-3 py-4">
                                                            <div className="font-bold text-lg mb-2 flex items-center gap-2">
                                                                <p>{item.name}</p>
                                                                {item.is_veg ? (
                                                                    <div className="w-3 h-3 border-green-500 border box-content sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 flex items-center justify-center">
                                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-3 h-3 border-red-500 border box-content sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 flex items-center justify-center">
                                                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-700 text-sm mb-2">₹ {item.price}</p>
                                                            <p className={`text-gray-700 text-sm mb-2 pr-2 ${showFullDescription ? 'block' : 'truncate'}`}>
                                                                {item.description}
                                                            </p>
                                                            {item.description.length > 50 && (
                                                                <button
                                                                    className="text-blue-500 text-xs cursor-pointer focus:outline-none py-2"
                                                                    onClick={toggleDescription}
                                                                >
                                                                    {showFullDescription ? 'Read Less' : 'Read More'}
                                                                </button>
                                                            )}
                                                            <div className='flex gap-2'>
                                                                {menuItems && menuItems.includes(item.id) ? (
                                                                    <button onClick={() => removeItemFromMenu(item.id)} className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs px-2 rounded-lg h-6">
                                                                        Remove
                                                                    </button>
                                                                ) : (<button onClick={() => addItemToMenu(item.id)} className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs px-2 rounded-lg h-6">
                                                                    Add
                                                                </button>)}
                                                                <button onClick={() => deleteItem(item.id)} className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs px-2 rounded-lg h-6">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p></p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='text-center p-3'>No Data Found.</p>
                            )
                        }
                        <Modal isOpen={isAddDishModalOpen} closeModal={closeDishModal}>
                            <AddDishModal closeModal={closeDishModal} categoryId={addDishCategoryId} onAddSuccess={handleAddSuccess} refresh={refresh} setRefresh={setRefresh} />
                        </Modal>
                    </>
                )
            }
        </>
    );
}

export default ItemCard;