import React, { useState, useEffect, useRef } from 'react';
import RouteLink from '../../../components/RouteLink';

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

const Card = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const [box1Active, setBox1Active] = useState(false);
    const [box2Active, setBox2Active] = useState(false);

    const toggleBox1Color = () => {
        setBox1Active(!box1Active);
    };

    const toggleBox2Color = () => {
        setBox2Active(!box2Active);
    };

    return (
        <div className="md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white rounded-lg shadow-lg relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-t-xl"
                />
                <div className="p-4">
                    <div className='flex justify-between gap-2 mb-2'>
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <div className="flex justify-center items-center gap-1">
                            <div
                                onClick={toggleBox1Color}
                                className={`w-3 h-3 border-2 border-green-500 rounded-full flex items-center justify-center cursor-pointer ${box1Active ? 'bg-green-500' : ''
                                    }`}
                            >
                            </div>
                            <div
                                onClick={toggleBox2Color}
                                className={`w-3 h-3 border-2 border-red-500 rounded-full flex items-center justify-center cursor-pointer ${box2Active ? 'bg-red-500' : ''
                                    }`}
                            >
                            </div>
                        </div>
                    </div>
                    <p className={`text-gray-600 text-xs ${isExpanded ? '' : 'line-clamp-3'}`}>{item.description}</p>
                    {item.description.length > 150 && (
                        <button
                            onClick={toggleDescription}
                            className="text-blue-500 text-xs font-semibold hover:underline"
                        >
                            {isExpanded ? 'Read Less' : 'Read More'}
                        </button>
                    )}
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="text-blue-500 text-lg font-semibold"
                            >
                                -
                            </button>
                            <span className="mx-2 text-[0.8rem]">{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="text-blue-500 text-lg font-semibold"
                            >
                                +
                            </button>
                        </div>
                        <div className='items-end'>
                            <span className="text-green-500 font-semibold">{item.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CardList = ({ data }) => (
    <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center mx-4">
            {data.map((item) => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    </div>
);

function EditMenu() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMenuOpen1, setMenuOpen1] = useState(false);
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

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdowns);
        return () => {
            document.removeEventListener('mousedown', closeDropdowns);
        };
    }, []);

    return (
        <div className='px-4 py-4'>
            <RouteLink />
            <div className='flex flex-col gap-3'>
                <div className="relative inline-block text-left w-full" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={toggleMenu}
                        className="flex justify-between items-center w-full rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                        <div className="absolute right-0 z-10 mt-2 w-full lg:w-full sm:w-64 md:w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-1" tabIndex="-1">
                            <CardList data={cardData} />
                        </div>
                    )}
                </div>
                <div className="relative inline-block text-left w-full" ref={dropdownRef1}>
                    <button
                        type="button"
                        onClick={toggleMenu1}
                        className="flex justify-between items-center w-full rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
                        <div className="absolute right-0 z-10 mt-2 w-full lg:w-full sm:w-64 md:w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button-1" tabIndex="-1">
                            <CardList data={cardData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditMenu;