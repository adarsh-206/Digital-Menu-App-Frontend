import React, { useState, useEffect, useRef } from 'react';
import RouteLink from '../../../components/RouteLink';
import Modal from '../../../components/modals/FormModal';
import AddCategoryModal from '../../../components/modals/AddCategoryModal';
import axios from 'axios';
import ItemCard from './ItemCard';
import AddSubCategoryModal from '../../../components/modals/AddSubCategoryModal';

const EditMenu = () => {
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [isAddSubCategoryModalOpen, setAddSubCategoryModalOpen] = useState(false);
    const [isAddDishModalOpen, setAddDishModalOpen] = useState(false);
    const [categories, setCategories] = useState({});
    const [refresh, setRefresh] = useState(false);
    const dropdownRef = useRef(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);


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

    const toggleMenu = (categoryIndex) => {
        setSelectedCategoryId(categories[categoryIndex].id);
        setOpenDropdowns((prevOpenDropdowns) => {
            return { ...prevOpenDropdowns, [categoryIndex]: !prevOpenDropdowns[categoryIndex] };
        });
    };

    const closeDropdowns = (e) => {
        if (!dropdownRef.current.contains(e.target)) {
            setMenuOpen(false);
        }
    };

    const openCategoryModal = () => {
        setAddCategoryModalOpen(true);
    };

    const closeCategoryModal = () => {
        setAddCategoryModalOpen(false);
    };

    const openSubCategoryModal = (categoryId) => {
        setSelectedSubCategoryId(categoryId);
        setAddSubCategoryModalOpen(true);
    };

    const closeSubCategoryModal = () => {
        setAddSubCategoryModalOpen(false);
    };

    const handleAddSuccess = () => {
        setRefresh((prevRefresh) => !prevRefresh);
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdowns);
        return () => {
            document.removeEventListener('mousedown', closeDropdowns);
        };
    }, []);

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        getCategories()
    }, [refresh])

    return (
        <div className='px-4 py-4'>
            <div className='flex justify-between items-center'>
                <button onClick={openCategoryModal} className="bg-yellow-200 hover:bg-yellow-300 text-black text-sm py-2 px-2 rounded-lg h-10">
                    Add Category +
                </button>
                <RouteLink />
            </div>
            {/* Category dropdown start */}
            <div className='flex flex-col gap-3'>
                {Array.isArray(categories) && categories.length !== 0 ? (
                    categories.map((category, index) => (
                        <div key={index} className="relative inline-block text-left w-full" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => toggleMenu(index)}
                                className="flex justify-between items-center w-full rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
                                id={`menu-button-${index}`}
                                aria-expanded={openDropdowns[index]}
                                aria-haspopup="true"
                            >
                                <span>{category.name}</span>
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>

                            {openDropdowns[index] && (
                                <div className="absolute right-0 z-10 mt-2 w-full lg-w-full sm-w-64 md-w-96 overflow-y-auto origin-top-right rounded-md bg-slate-100 shadow-lg ring-1 ring-black ring-opacity-5 focus-outline-none border">
                                    <div className='p-4'>
                                        <button onClick={() => openSubCategoryModal(category.id)} className="bg-yellow-200 hover:bg-yellow-300 text-black text-xs py-2 px-2 rounded-lg h-8">
                                            Add SubCategory +
                                        </button>
                                    </div>
                                    <ItemCard category={category.id} onAddSuccess={handleAddSuccess} refresh={refresh} setRefresh={setRefresh} />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='text-center p-3'>No Data Found.</p>
                )}
            </div>
            {/* Category dropdown ends */}
            <Modal isOpen={isAddCategoryModalOpen} closeModal={closeCategoryModal}>
                <AddCategoryModal closeModal={closeCategoryModal} onAddSuccess={handleAddSuccess} />
            </Modal>
            <Modal isOpen={isAddSubCategoryModalOpen} closeModal={closeSubCategoryModal}>
                <AddSubCategoryModal closeModal={closeSubCategoryModal} onAddSuccess={handleAddSuccess} selectedSubCategoryId={selectedSubCategoryId} />
            </Modal>
        </div>
    );
};

export default EditMenu;
