import React from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="relative w-11/12 max-w-md mx-auto p-6 bg-white rounded shadow-lg">
                <button
                    onClick={closeModal}
                    className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;