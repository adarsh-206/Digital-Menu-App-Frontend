import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { FaDesktop, FaTablet, FaMobile } from 'react-icons/fa';
import CategorySlider from './previewMenu/CategorySlider';
import Navbar from './previewMenu/Navbar';

function PreviewMenu() {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });
    const isExtraSmallScreen = useMediaQuery({ maxWidth: 480 });
    const [widthStyle, setWidthStyle] = useState('60vw'); // Initialize width style

    const setWidth = (width) => {
        setWidthStyle(width);
    };

    // Define styles based on screen size and widthStyle
    const largeScreenStyle = {
        backgroundColor: 'white',
        position: 'absolute',
        top: '58%',
        left: '58%',
        transform: 'translate(-50%, -50%)',
        height: '75vh',
        width: widthStyle, // Use widthStyle here
    };

    const smallScreenStyle = {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '54%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '84vh',
        width: '80vw',
    };

    return (
        <div className='flex flex-col items-center gap-2.5 p-4'>
            <div className='space-x-2 flex'>
                <button onClick={() => setWidth('60vw')} className='bg-blue-500 text-white p-2 rounded flex flex-col items-center'>
                    <FaDesktop /> <span>Desktop</span>
                </button>
                <button onClick={() => setWidth('50vw')} className='bg-blue-500 text-white p-2 rounded flex flex-col items-center'>
                    <FaTablet /> <span>Tablet</span>
                </button>
                <button onClick={() => setWidth('30vw')} className='bg-blue-500 text-white p-2 rounded flex flex-col items-center'>
                    <FaMobile /> <span>Mobile</span>
                </button>
            </div>
            <div style={isSmallScreen ? smallScreenStyle : largeScreenStyle}>
                <Navbar />
                <CategorySlider containerWidth={widthStyle} />
            </div>
        </div>
    );
}

export default PreviewMenu;