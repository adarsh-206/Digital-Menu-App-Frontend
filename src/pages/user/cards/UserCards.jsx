import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const UserCards = ({ menu }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {
                menu.map((item, index) => (
                    <div key={index}>
                        <p className='px-0 pt-1 text-sm'>{item.name}</p>
                        <div className="flex flex-wrap justify-center">
                            {Array.isArray(item.items) && item.items.length !== 0 ? (
                                item.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="max-w-lg w-full overflow-hidden shadow-lg m-1 py-0.5 flex bg-white items-center">
                                        <img className="w-1/3 h-16 object-cover rounded-xl p-2" src={`${import.meta.env.VITE_BASE_URL}${item.image}`} alt={item.name} />
                                        <div className="w-2/3 px-3 py-1">
                                            <div className="font-bold text-lg mb-1 flex items-center gap-2">
                                                <p className='text-sm'>{item.name}</p>
                                                {item.is_veg ? (
                                                    <div className="w-3 h-3 border-green-500 border box-content sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                    </div>
                                                ) : (
                                                    <div className="w-3 h-3 border-red-500 border box-content sm:w-3 sm:h-3 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3 xl:h-3 flex items-center justify-center">
                                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-700 text-sm mb-1">₹ {item.price}</p>
                                            <p className={`text-gray-700 text-[0.65rem] mb-1 pr-2 ${showFullDescription ? 'block' : 'truncate'}`}>
                                                {item.description}
                                            </p>
                                            {item.description.length > 50 && (
                                                <button
                                                    className="text-blue-500 text-xs cursor-pointer focus:outline-none py-2"
                                                    onClick={toggleDescription}
                                                >
                                                    {showFullDescription ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </div>
                                        <div className='px-2'>
                                            <AiOutlineEye onClick={onOpenModal} className="text-gray-500 cursor-pointer" />
                                        </div>
                                        <Modal open={open} onClose={onCloseModal} center>
                                            <h2>Simple centered modal</h2>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                                hendrerit risus, sed porttitor quam.
                                            </p>
                                        </Modal>
                                    </div>
                                ))
                            ) : (
                                <p>No Data Found</p>
                            )}
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default UserCards;