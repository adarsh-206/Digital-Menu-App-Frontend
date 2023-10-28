import React, { useState } from 'react';
import Navbar from './Navbar';
import { BiSearch, BiFilterAlt, BiLogoInstagram } from 'react-icons/bi'
import CategorySlider from './CategorySlider';
import TopItems from './TopItems';

function Menu() {
    const [state, setState] = useState('desktop');
    return (
        <>
            <div className="flex flex-col">
                <Navbar />
                <div className="flex-1">
                    <div className="flex justify-between items-center p-4">
                        <span className='text-xl text-red-700'>Menu</span>
                        <div className="flex space-x-4 text-red-700">
                            <BiSearch className="text-2xl cursor-pointer" />
                            <BiFilterAlt className="text-2xl cursor-pointer" />
                            <BiLogoInstagram className="text-2xl cursor-pointer" />
                        </div>
                    </div>
                    <CategorySlider />
                    <TopItems />
                </div>

            </div>
        </>
    );
}

export default Menu;