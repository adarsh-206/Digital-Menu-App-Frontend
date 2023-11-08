import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-white p-2 sticky top-0 z-50 shadow-lg text-defaultColor" style={{ width: '60vw' }}>
            <div className="flex items-center flex-shrink-0 py-2 gap-2">
                <img
                    src="https://img.icons8.com/arcade/64/xbox-menu.png"
                    width={35}
                    alt=""
                />
                <span className={`text-lg font-semibold whitespace-pre ${isOpen ? "block" : "hidden"}`}>
                    My Restaurant
                </span>
            </div>
            <div className="block lg:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3"
                >
                    <HiMenu size={25} />
                </button>
            </div>
            <div className={`w-full block lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
                <div className="font-poppins text-lg lg:flex-grow lg:justify-end">
                    <Link to="/Specialities" className="text-black hover:text-orange-500 block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-8">
                        Our Specialities
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
