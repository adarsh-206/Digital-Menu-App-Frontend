import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import angry from '../../assets/angry.png';
import bad from '../../assets/bad.png';
import average from '../../assets/average.png';
import good from '../../assets/good.png';
import loved from '../../assets/loved.png';

const Feedback = ({ onClose }) => {
    const [rating, setRating] = useState(null);
    const [feedbackType, setFeedbackType] = useState('');
    const [additionalComments, setAdditionalComments] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRatingClick = (selectedRating) => {
        setRating(selectedRating);
        setSelectedItem(selectedRating);
    };

    const handleFeedbackTypeClick = (type) => {
        console.log(type);
        setFeedbackType((prevTypes) => {
            if (prevTypes.includes(type)) {
                return prevTypes.filter((prevType) => prevType !== type);
            } else {
                return [...prevTypes, type];
            }
        });
    };

    const handleSubmit = () => {
        console.log('Heyyy');
        console.log('Rating:', rating);
        console.log('Feedback Type:', feedbackType);
        console.log('Additional Comments:', additionalComments);
    };

    return (
        <div className="absolute top-0 right-0 w-full bg-white shadow-lg z-50">
            <div className="flex bg-black py-5 px-2">
                <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                    <FaArrowLeft size={20} color="white" />
                </button>
                <p className="flex items-center justify-center text-lg text-white font-semibold flex-1">Feedback</p>
            </div>
            <div className="text-center mt-5">
                <p className="text-xs">Please take a moment to let us know how we did.</p>
                <p className="text-xs">It would mean a lot to us!</p>
            </div>
            <div className="text-center mt-5">
                <p className="text-xl font-bold">How was your visit?</p>
            </div>
            <div className="flex justify-evenly mt-5 text-xs text-gray-500">
                {[
                    { type: 'Angry', image: angry },
                    { type: 'Bad', image: bad },
                    { type: 'Average', image: average },
                    { type: 'Good', image: good },
                    { type: 'Loved', image: loved },
                ].map((item) => (
                    <div
                        key={item.type}
                        className={`text-center group ${selectedItem === item.type ? 'scale-150' : ''}`}
                        onClick={() => handleRatingClick(item.type)}
                    >
                        <img src={item.image} alt={item.type.toLowerCase()} className="h-12 w-12 transition-transform transform group-hover:scale-150" />
                        <p className="transition-transform transform group-hover:scale-110 pt-4">{item.type}</p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-5">
                <p className="text-xl font-bold">What impacted your rating?</p>
                <div className="mt-3 flex flex-col justify-center items-center gap-2">
                    {['Food Quality', 'Service'].map((type) => (
                        <button
                            key={type}
                            className={`px-2 py-2 border rounded-lg w-48 ${feedbackType.includes(type) ? 'bg-black text-white' : 'border-black'}`}
                            onClick={() => handleFeedbackTypeClick(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div className="p-4 mt-4 text-sm">
                <p>Would you like to add anything?</p>
                <textarea
                    rows="4"
                    className="w-full border p-2 mt-2"
                    placeholder="Type your text here"
                    value={additionalComments}
                    onChange={(e) => setAdditionalComments(e.target.value)}
                ></textarea>
            </div>
            <div className="p-4 text-sm text-white flex justify-center">
                <button className="px-1 py-2 border bg-black rounded-lg w-32 cursor-pointer" onClick={handleSubmit} disabled={!rating || !feedbackType.length}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Feedback;