import React, { useState, useEffect, useRef } from 'react';

function Dropdown({ buttonLabel, menuItems }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close the menu when the user clicks outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleMenu}
                className="flex justify-between items-center w-full rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover-bg-gray-50"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
            >
                {buttonLabel}
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 z-10 mt-2 w-full lg:w-full sm:w-64 md:w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus-outline-none" role="menu" aria-orientation="vertical" tabIndex="-1">
                    {menuItems.map((item, index) => (
                        <div key={index} className="p-4 ml-3">
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;