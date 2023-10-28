import React, { useState } from 'react';

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

export default Card;