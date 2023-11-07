import React, { useState, useEffect, useRef } from 'react';
import RouteLink from '../../../components/RouteLink';
import CardList from '../../../components/cards/CardList';
import Modal from '../../../components/modals/FormModal';
import AddDishModal from '../../../components/modals/AddDishModal';
import { Link } from 'react-router-dom';
import AddCategoryModal from '../../../components/modals/AddCategoryModal';

const cardData = [
    {
        id: 1,
        name: 'Pizza',
        description: 'Description of Food Item 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod non arcu non bibendum. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi at elit id erat fermentum iaculis. Vivamus eget scelerisque sapien. Sed eu cursus erat. Etiam convallis et elit vel auctor.',
        price: '₹140',
        image: 'https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?w=740&t=st=1698128622~exp=1698129222~hmac=939ce41e4849730119cd5aef61c1a1eccd5e8d535a9022ee065121458ae2ea3a',
    },
    {
        id: 2,
        name: 'Biryanu',
        description: 'Description of Food Item 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod non arcu non bibendum. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi at elit id erat fermentum iaculis. Vivamus eget scelerisque sapien. Sed eu cursus erat. Etiam convallis et elit vel auctor.',
        price: '₹220',
        image: 'https://blog.travelkhana.com/tkblog/wp-content/uploads/sites/2/2023/02/A-to-Z-Food-1024x683.jpg',
    },
    {
        id: 3,
        name: 'Samosa',
        description: 'Description of Food Item 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod non arcu non bibendum. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi at elit id erat fermentum iaculis. Vivamus eget scelerisque sapien. Sed eu cursus erat. Etiam convallis et elit vel auctor.',
        price: '₹18',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK9IhH_yzBbMSlEk43Vh-Ms-3nP7yUuPRaSA&usqp=CAU',
    },
    {
        id: 4,
        name: 'Butter Paneer',
        description: 'Description of Food Item 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod non arcu non bibendum. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi at elit id erat fermentum iaculis. Vivamus eget scelerisque sapien. Sed eu cursus erat. Etiam convallis et elit vel auctor.',
        price: '₹249',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT86X_FCr5NI8bsDoyoJ-JWvfgyo-5zdhnZFg&usqp=CAU',
    },
];

const EditMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuOpen1, setMenuOpen1] = useState(false);
    const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
    const [isAddDishModalOpen, setAddDishModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dropdownRef1 = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
        if (isMenuOpen1) {
            setMenuOpen1(false);
        }
    };

    const toggleMenu1 = () => {
        setMenuOpen1(!isMenuOpen1);
        if (isMenuOpen) {
            setMenuOpen(false);
        }
    };

    const closeDropdowns = (e) => {
        if (!dropdownRef.current.contains(e.target) && !dropdownRef1.current.contains(e.target)) {
            setMenuOpen(false);
            setMenuOpen1(false);
        }
    };

    const openCategoryModal = () => {
        setAddCategoryModalOpen(true);
    };

    const closeCategoryModal = () => {
        setAddCategoryModalOpen(false);
    };

    const openDishModal = () => {
        setAddDishModalOpen(true);
    };

    const closeDishModal = () => {
        setAddDishModalOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdowns);
        return () => {
            document.removeEventListener('mousedown', closeDropdowns);
        };
    }, []);

    return (
        <div className='px-4 py-4'>
            <div className='flex justify-between items-center'>
                <button onClick={openCategoryModal} className="bg-yellow-200 hover:bg-yellow-300 text-black text-sm py-2 px-2 rounded-lg h-10">
                    Add Category +
                </button>
                <RouteLink />
            </div>
            <div className='flex flex-col gap-3'>
                <div className="relative inline-block text-left w-full" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="flex justify-between items-center w-full rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
                        id="menu-button-1"
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                    >
                        <span>Category 1</span>
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-full lg-w-full sm-w-64 md-w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus-outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-1" tabIndex="-1">
                            <div className='p-4 ml-3'>
                                <button onClick={openDishModal} className="bg-yellow-200 hover:bg-yellow-300 text-black text-sm py-2 px-2 rounded-lg h-10">
                                    Add Dish +
                                </button>
                            </div>
                            <CardList data={cardData} />
                        </div>
                    )}
                </div>
                <div className="relative inline-block text-left w-full" ref={dropdownRef1}>
                    <button
                        type="button"
                        onClick={toggleMenu1}
                        className="flex justify-between items-center w-full rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
                        id="menu-button-1"
                        aria-expanded={isMenuOpen1}
                        aria-haspopup="true"
                    >
                        <span>Category 2</span>
                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {isMenuOpen1 && (
                        <div className="absolute right-0 z-10 mt-2 w-full lg-w-full sm-w-64 md-w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus-outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-1" tabIndex="-1">
                            <div className='p-4 ml-3'>
                                <Link to="/edit-menu" className="bg-yellow-200 hover-bg-yellow-300 text-black text-sm py-2 px-2 rounded-lg h-10">
                                    Add Dish +
                                </Link>
                            </div>
                            <CardList data={cardData} />
                        </div>
                    )}
                </div>
            </div>
            <Modal isOpen={isAddCategoryModalOpen} closeModal={closeCategoryModal}>
                <AddCategoryModal closeModal={closeCategoryModal} />
            </Modal>
            <Modal isOpen={isAddDishModalOpen} closeModal={closeDishModal}>
                <AddDishModal closeModal={closeDishModal} />
            </Modal>
        </div>
    );
};

export default EditMenu;
