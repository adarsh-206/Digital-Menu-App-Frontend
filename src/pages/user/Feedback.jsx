import React from 'react';
import { FaArrowLeft } from "react-icons/fa";
import angry from '../../assets/angry.png';
import bad from '../../assets/bad.png';
import average from '../../assets/average.png';
import good from '../../assets/good.png';
import loved from '../../assets/loved.png';

function Feedback({ onClose }) {
    return (
        <div className="absolute top-0 right-0 w-full bg-white shadow-lg z-50">
            <div className='flex bg-black py-5 px-2'>
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <FaArrowLeft size={20} color='white' />
                </button>
                <p className='flex items-center justify-center text-lg text-white font-semibold flex-1'>Feedback</p>
            </div>
            <div className='text-center mt-5'>
                <p className='text-xs'>Please take a moment to let us know how we did.</p>
                <p className='text-xs'>It would mean a lot to us!</p>
            </div>
            <div className='text-center mt-5'>
                <p className='text-xl font-bold'>How was your visit?</p>
            </div>
            <div className="flex justify-evenly mt-5 text-xs text-gray-500">
                <div className="text-center group">
                    <img src={angry} alt="angry" className="h-12 w-12 transition-transform transform group-hover:scale-150" />
                    <p className="transition-transform transform group-hover:scale-110 pt-4">Angry</p>
                </div>
                <div className="text-center group">
                    <img src={bad} alt="bad" className="h-12 w-12 transition-transform transform group-hover:scale-150" />
                    <p className="transition-transform transform group-hover:scale-110 pt-4">Bad</p>
                </div>
                <div className="text-center group">
                    <img src={average} alt="average" className="h-12 w-12 transition-transform transform group-hover:scale-150" />
                    <p className="transition-transform transform group-hover:scale-110 pt-4">Average</p>
                </div>
                <div className="text-center group">
                    <img src={good} alt="good" className="h-12 w-12 transition-transform transform group-hover:scale-150" />
                    <p className="transition-transform transform group-hover:scale-110 pt-4">Good</p>
                </div>
                <div className="text-center group">
                    <img src={loved} alt="loved" className="h-12 w-12 transition-transform transform group-hover:scale-150" />
                    <p className="transition-transform transform group-hover:scale-110 pt-4">Loved</p>
                </div>
            </div>
            <div className='text-center mt-5'>
                <p className='text-xl font-bold'>What impacted your rating?</p>
                <div className='mt-3 flex flex-col justify-center items-center gap-2'>
                    <button className='px-2 py-2 border border-black rounded-lg w-48'>Food Quality</button>
                    <button className='px-2 py-2 border border-black rounded-lg w-48'>Service</button>
                </div>
            </div>
            <div className='p-4 mt-4 text-sm'>
                <p>Would you like to add anything?</p>
                <textarea rows="4" className="w-full border p-2 mt-2" placeholder="Type your text here"></textarea>
            </div>
            <div className='p-4 text-sm text-white flex justify-center'>
                <button className='px-1 py-2 border bg-black rounded-lg w-32'>Submit</button>
            </div>
        </div>
    );
}

export default Feedback