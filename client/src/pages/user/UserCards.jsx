import React, { useState } from 'react';

const UserCards = ({ data }) => {
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
        <div className="container mx-auto">
            <div className="flex flex-wrap justify-center items-center mx-4">
                {data.map((item) => (
                    <div key={item.id} className="md:w-1/2 lg:w-1/3 xl:w-1/4 py-2">
                        <div className="bg-white rounded-sm shadow-xl relative flex justify-center items-center px-2">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-32 w-1/3 object-cover rounded-xl"
                            />
                            <div className="w-2/3 p-3">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <div className='items-end'>
                                    <span className="text-green-500">{item.price}</span>
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

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserCards;