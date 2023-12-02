import React, { useState, useEffect, useRef } from 'react';
import UserSidebar from './sidebar/UserSidebar';
import { MdEdit } from 'react-icons/md';
import { AiOutlineSearch, AiOutlineInstagram } from 'react-icons/ai';
import { TfiFilter } from 'react-icons/tfi';
import UserCards from './cards/UserCards';
import axios from 'axios';
import Feedback from './Feedback';
import { useParams } from 'react-router-dom';
import Slider from "@mui/material/Slider";

function Menu({ gstNo, menuId }) {
    const [categories, setCategories] = useState([]);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [menuName, setMenuName] = useState('Menu')
    const dropdownRef = useRef(null);
    const [isFeedbackOpen, setFeedbackOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [isVegChecked, setVegChecked] = useState(false);
    const [isNonVegChecked, setNonVegChecked] = useState(false);
    const [range, setRange] = useState([0, 2000]);
    const [minPrice, setMinPrice] = useState(range[0]);
    const [maxPrice, setMaxPrice] = useState(range[1]);
    const [eventData, setEventData] = useState([]);
    const { gst_no, menu_id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [openingHours, setOpeningHours] = useState({
        Monday: { open: '', close: '' },
        Tuesday: { open: '', close: '' },
        Wednesday: { open: '', close: '' },
        Thursday: { open: '', close: '' },
        Friday: { open: '', close: '' },
        Saturday: { open: '', close: '' },
        Sunday: { open: '', close: '' },
    });

    const openFeedback = () => {
        setFeedbackOpen(true);
    };

    const closeFeedback = () => {
        setFeedbackOpen(false);
    };

    const toggleMenu = (categoryIndex) => {
        setOpenDropdowns((prevOpenDropdowns) => {
            return { ...prevOpenDropdowns, [categoryIndex]: !prevOpenDropdowns[categoryIndex] };
        });
    };

    const closeDropdowns = (e) => {
        if (
            !dropdownRef.current.contains(e.target) &&
            !e.target.closest('.filter-dropdown') &&
            !e.target.closest('.filter-dropdown-button')
        ) {
            setMenuOpen(false);
            setFilterDropdownOpen(false);
        }
    };

    const getRestaurantDetail = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const restaurantEndpoint = `/api/restaurants/details/${gst_no ? gst_no : gstNo}`;

        axios.get(baseUrl + restaurantEndpoint)
            .then(response => {
                const responseData = response.data || [];
                setRestaurantDetails(responseData);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getTimings = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const createEventEndpoint = `/api/restaurants/opening-hours/${gst_no ? gst_no : gstNo}`;

        axios.get(baseUrl + createEventEndpoint)
            .then(response => {
                const responseData = response.data[0] || {}
                const formatTime = (time) => time ? time.slice(0, 5) : '';
                const convertTo12HourFormat = (time) => {
                    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
                    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', options);
                };
                setOpeningHours({
                    Monday: {
                        open: convertTo12HourFormat(formatTime(responseData.monday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.monday_close)),
                    },
                    Tuesday: {
                        open: convertTo12HourFormat(formatTime(responseData.tuesday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.tuesday_close)),
                    },
                    Wednesday: {
                        open: convertTo12HourFormat(formatTime(responseData.wednesday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.wednesday_close)),
                    },
                    Thursday: {
                        open: convertTo12HourFormat(formatTime(responseData.thursday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.thursday_close)),
                    },
                    Friday: {
                        open: convertTo12HourFormat(formatTime(responseData.friday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.friday_close)),
                    },
                    Saturday: {
                        open: convertTo12HourFormat(formatTime(responseData.saturday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.saturday_close)),
                    },
                    Sunday: {
                        open: convertTo12HourFormat(formatTime(responseData.sunday_open)),
                        close: convertTo12HourFormat(formatTime(responseData.sunday_close)),
                    },
                });
            })
            .catch(error => {

            });
    };

    const getEvents = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const getEventEndpoint = `/api/restaurants/events/${gst_no ? gst_no : gstNo}`;

        axios.get(baseUrl + getEventEndpoint)
            .then(response => {
                const responseData = response.data || {};
                setEventData(responseData);
            })
            .catch(error => {

            });
    };

    const handleInputChange = (e) => {
        const newSearchQuery = e.target.value;
        setSearchQuery(newSearchQuery);
        getItems();
    };

    const getItems = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        let itemsEndpoint;

        if (searchQuery) {
            itemsEndpoint = `/api/filtered-items/?gst_no=${gst_no ? gst_no : gstNo}&menu_id=${menu_id ? menu_id : menuId}&q=${searchQuery}`;
        } else {
            itemsEndpoint = `/api/sorted-items/?gst_no=${gst_no ? gst_no : gstNo}&menu_id=${menu_id ? menu_id : menuId}&is_veg=${isVegChecked}&is_non_veg=${isNonVegChecked}&min_price=${minPrice}&max_price=${maxPrice}`;
        }

        axios
            .get(baseUrl + itemsEndpoint)
            .then((response) => {
                setCategories(response.data[0].categories);
                setMenuName(response.data[0].name);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        document.addEventListener('mousedown', closeDropdowns);
        return () => {
            document.removeEventListener('mousedown', closeDropdowns);
        };
    }, []);

    useEffect(() => {
        getItems();
        getEvents();
        getTimings();
        getRestaurantDetail();
    }, []);

    useEffect(() => {
        getItems();
    }, [gstNo, menuId, searchQuery, isVegChecked, isNonVegChecked, minPrice, maxPrice]);

    const toggleSearch = () => {
        setSearchOpen((prevSearchOpen) => !prevSearchOpen);
    };

    const closeInputSearch = () => {
        setSearchQuery('');
        getItems();
        setSearchOpen((prevSearchOpen) => !prevSearchOpen);
    }

    const handleChanges = (event, newRange) => {
        setRange(newRange);
        setMinPrice(newRange[0]);
        setMaxPrice(newRange[1]);
    };


    return (
        <div className="flex min-h-screen relative">
            <UserSidebar eventData={eventData} openingHours={openingHours} restaurantDetails={restaurantDetails ? restaurantDetails : ''} />
            <div className="absolute top-0 right-0 p-4">
                <button onClick={openFeedback} className="bg-black text-white text-sm px-3 py-1.5 rounded-xl">
                    <span className="flex items-center gap-1">
                        Feedback <MdEdit size={15} />
                    </span>
                </button>
            </div>
            {isFeedbackOpen && <Feedback onClose={closeFeedback} />}
            <div className="flex-1 mt-16 px-4">
                <div className="flex justify-between">
                    <button className="bg-black text-white py-1.5 px-3 text-sm rounded-2xl">{menuName}</button>
                    {!isSearchOpen ? (
                        <div className="flex justify-evenly gap-2">
                            <div className="w-8 h-8 p-1 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer" onClick={toggleSearch}>
                                <AiOutlineSearch size={16} />
                            </div>
                            <div className="w-8 h-8 p-1 rounded-full border border-gray-500 flex items-center justify-center filter-dropdown-button cursor-pointer" onClick={() => setFilterDropdownOpen(!isFilterDropdownOpen)}>
                                <TfiFilter size={16} />
                            </div>
                            <div className="w-8 h-8 p-1 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer">
                                <AiOutlineInstagram size={16} />
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2 relative'>
                            <div className="relative">
                                <input type="text" placeholder="Search..." className="border border-gray-300 p-2 text-sm rounded-xl h-8 w-48 focus:outline-none" value={searchQuery} onChange={handleInputChange} />
                                <button onClick={() => closeInputSearch()} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer">&#x2715;</button>
                            </div>
                        </div>
                    )}
                </div>
                {isFilterDropdownOpen && (
                    <div className="absolute top-25 right-0 m-2 z-50 bg-white text-sm border border-gray-300 p-2 rounded-md filter-dropdown h-40 w-48">
                        <div>
                            <p className="font-semibold mb-2">Sort By:</p>
                            <div className='m-2'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="veg"
                                        checked={isVegChecked}
                                        onChange={() => setVegChecked(!isVegChecked)}
                                    />
                                    <span className='ml-2'>Veg</span>
                                </label>
                            </div>
                            <div className='m-2'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="nonVeg"
                                        checked={isNonVegChecked}
                                        onChange={() => setNonVegChecked(!isNonVegChecked)}
                                    />
                                    <span className='ml-2'>Non-Veg</span>
                                </label>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="font-semibold mb-2">Price Range:</p>
                            <div className='m-2'>
                                <Slider value={range} min={0} max={2000} onChange={handleChanges} valueLabelDisplay="auto" sx={{ color: '#610C9F' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-col gap-3 mt-5">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="relative inline-block text-left w-full"
                            ref={dropdownRef}
                        >
                            <button
                                type="button"
                                onClick={() => toggleMenu(index)}
                                className={`flex justify-between items-center w-full py-2 text-[0.9rem] font-bold text-gray-900 hover-bg-gray-50 border-b border-gray-300`}
                                id={`menu-button-${index}`}
                                aria-expanded={openDropdowns[index]}
                                aria-haspopup="true"
                            >
                                <span>{category.name}</span>
                                <svg
                                    className={`-mr-1 h-6 w-6 text-black transform ${openDropdowns[index] ? 'rotate-180 transition-transform duration-200 ease-in-out' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {openDropdowns[index] && (
                                <div
                                    className=" mt-2 w-full lg-w-full sm-w-64 md-w-96 origin-top-right focus-outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby={`menu-button-${category.id}`}
                                    tabIndex="-1"
                                >
                                    <UserCards menu={category.subcategories} description={category.description} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;