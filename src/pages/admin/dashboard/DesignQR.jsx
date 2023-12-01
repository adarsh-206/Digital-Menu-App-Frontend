import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { MdContentCopy } from 'react-icons/md';
import QRCodeGenerator from './QRCodeGenerator';
import CollapsiblePanel from '../../../components/panel/CollapsablePanel';

function DesignQR() {
    const [url, setUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [menuId, setMenuId] = useState();
    const [isLaunch, setIsLaunch] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#ffffff');
    const [selectedDotColor, setSelectedDotColor] = useState('#000000');
    const [qrWidth, setQRWidth] = useState(200);
    const [qrHeight, setQRHeight] = useState(200);
    const [qrMargin, setQRMargin] = useState(0);
    const [selectedDotType, setSelectedDotType] = useState('square');
    const [selectedCornerDotType, setSelectedCornerDotType] = useState('square');
    const [selectedCornerSquareType, setSelectedCornerSquareType] = useState('square');
    const [isChecked, setIsChecked] = useState(false);
    const [imageSize, setImageSize] = useState(0.4);
    const [imageMargin, setImageMargin] = useState(0);
    const [errorLevel, setErrorLevel] = useState("Q");
    const [colorType, setColorType] = useState('single');
    const [backgroundColor1, setBackgroundColor1] = useState('#ffffff');
    const [backgroundColor2, setBackgroundColor2] = useState('#ffffff');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const fileUrl = URL.createObjectURL(file);
        setFileUrl(fileUrl);
    };

    const handleImageSize = (event) => {
        const newImageSize = parseFloat(event.target.value);
        setImageSize(newImageSize);
    };

    const handleImageMargin = (event) => {
        const newImageMargin = parseInt(event.target.value);
        setImageMargin(newImageMargin);
    };

    const handleMargin = (event) => {
        const newMargin = event.target.value;
        setQRMargin(newMargin);
    };

    const handleWidthChange = (event) => {
        const newWidth = parseInt(event.target.value, 10);
        setQRWidth(newWidth);
    };

    const handleHeightChange = (event) => {
        const newHeight = parseInt(event.target.value, 10);
        setQRHeight(newHeight);
    };

    const handleColorTypeChange = (event) => {
        setColorType(event.target.value);
    };

    const handleDotType = (event) => {
        setSelectedDotType(event.target.value);
    };

    const handleDotColor = (event) => {
        setSelectedDotColor(event.target.value);
    };

    const handleCornerSquareType = (event) => {
        setSelectedCornerSquareType(event.target.value);
    };

    const [selectedCornerSquareColor, setSelectedCornerSquareColor] = useState();
    const handleCornerSquareColor = (event) => {
        setSelectedCornerSquareColor(event.target.value);
    };

    const handleCornerDotType = (event) => {
        setSelectedCornerDotType(event.target.value);
    };

    const [selectedCornerDotColor, setSelectedCornerDotColor] = useState();
    const handleCornerDotColor = (event) => {
        setSelectedCornerDotColor(event.target.value);
    };

    const handleBackgroundColor1Change = (event) => {
        setBackgroundColor1(event.target.value);
    };

    const handleBackgroundColor2Change = (event) => {
        setBackgroundColor2(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleErrorLevelChange = (event) => {
        const newErrorLevel = event.target.value;
        setErrorLevel(newErrorLevel);
    };

    const getMenus = () => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const menuListEndpoint = '/api/menus';
        const token = localStorage.getItem('access_token');

        if (token) {
            axios.get(baseUrl + menuListEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    const responseData = response.data || [];
                    setMenuId(responseData[0].id);
                    setIsLaunch(responseData[0].launch_status);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        setUrl(localStorage.getItem('qr_code_link'));
        getMenus();
    }, []);

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    }

    const qrCodeGeneratorRef = useRef(null);

    return (
        <>
            {
                isLaunch ? (
                    <div className='mt-[3rem]'>
                        <div className="text-center">
                            <div className="flex justify-center">
                                <div className='bg-white p-5 md:w-[33%] w-full rounded-lg shadow-lg'>
                                    <QRCodeGenerator
                                        url={url}
                                        ref={qrCodeGeneratorRef}
                                        backgroundColor={selectedColor}
                                        dotColor={selectedDotColor}
                                        imageDots={isChecked}
                                        imageSize={imageSize}
                                        imageMargin={imageMargin}
                                        image={fileUrl}
                                        width={qrWidth}
                                        height={qrHeight}
                                        dotType={selectedDotType}
                                        cornerDotType={selectedCornerDotType}
                                        dotCornerColor={selectedCornerDotColor}
                                        cornerSquareType={selectedCornerSquareType}
                                        dotSquareColor={selectedCornerSquareColor}
                                        errorCorrectionLevel={errorLevel}
                                        margin={qrMargin}
                                        backgroundColorType={colorType}
                                        backgroundColor1={backgroundColor1}
                                        backgroundColor2={backgroundColor2}
                                        className="mx-auto"
                                    />
                                    <div className="mt-5 mx-auto">
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-2 border border-gray-400 rounded-md">
                                            <p className="text-center text-gray-500 text-xs md:max-w-[270px] overflow-hidden overflow-ellipsis">
                                                {url}
                                            </p>
                                            <button
                                                className={`text-${isCopied ? 'green' : 'blue'}-500 hover:text-${isCopied ? 'green' : 'blue'}-700`}
                                                onClick={copyToClipboard}
                                            >
                                                <MdContentCopy size={19} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-shrink-0 w-full md:w-1/2">
                                <CollapsiblePanel title="QR Options">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4">
                                        <div>
                                            <p>Error Correction Level:</p>
                                        </div>
                                        <div>
                                            <select value={errorLevel} onChange={handleErrorLevelChange} className='border border-gray-400 px-1'>
                                                <option value="L">L</option>
                                                <option value="M">M</option>
                                                <option value="Q">Q</option>
                                                <option value="H">H</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p>Height:</p>
                                        </div>
                                        <div>
                                            <input type='number' value={qrHeight} onChange={handleHeightChange} className='border border-gray-400 p-1' />
                                        </div>
                                        <div>
                                            <p>Width:</p>
                                        </div>
                                        <div>
                                            <input type='number' value={qrWidth} onChange={handleWidthChange} className='border border-gray-400 p-1' />
                                        </div>
                                        <div>
                                            <p>Margin:</p>
                                        </div>
                                        <div>
                                            <input type='number' value={qrMargin} onChange={handleMargin} className='border border-gray-400 p-1' />
                                        </div>
                                    </div>
                                </CollapsiblePanel>
                                <CollapsiblePanel title="Background Options">
                                    <div className="grid grid-cols-1 text-sm p-4">
                                        <div className='flex items-center mb-5'>
                                            <p>Color Type:</p>
                                            <div className='flex-1 flex items-center justify-evenly space-x-2'>
                                                <div className='flex items-center'>
                                                    <input type="radio" id="singleColor" name="colorType" value="single" checked={colorType === 'single'} onChange={handleColorTypeChange} />
                                                    <label htmlFor="singleColor" className='pl-2'>Single Color</label>
                                                </div>
                                                <div className='flex items-center'>
                                                    <input type="radio" id="gradient" name="colorType" value="gradient" checked={colorType === 'gradient'} onChange={handleColorTypeChange} />
                                                    <label htmlFor="gradient" className='pl-2'>Gradient</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-4 md:mt-0 flex'>
                                            <p>Background Color:</p>
                                            {colorType === 'single' && (
                                                <input type="color" value={backgroundColor1} onChange={handleBackgroundColor1Change} className='border border-gray-300 p-1 mt-2 md:mt-0 md:ml-2' />
                                            )}
                                            {colorType === 'gradient' && (
                                                <>
                                                    <input type="color" value={backgroundColor1} onChange={handleBackgroundColor1Change} className='border border-gray-300 p-1 mt-2 md:mt-0 md:ml-2' />
                                                    <input type="color" value={backgroundColor2} onChange={handleBackgroundColor2Change} className='border border-gray-300 p-1 mt-2 md:mt-0 md:ml-2' />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </CollapsiblePanel>
                                <CollapsiblePanel title="Corners Square Options">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4">
                                        <div>
                                            <p>Corner Square Style:</p>
                                        </div>
                                        <div>
                                            <select value={selectedCornerSquareType} onChange={handleCornerSquareType} className='border border-gray-400 px-1'>
                                                <option value="dot">Dot</option>
                                                <option value="square">Square</option>
                                                <option value="extra-rounded">Extra-rounded</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p>Color:</p>
                                        </div>
                                        <div>
                                            <input type="color" value={selectedCornerSquareColor} onChange={handleCornerSquareColor} className='border border-gray-300 p-1 mt-2 md:mt-0 md:ml-2' />
                                        </div>
                                    </div>
                                </CollapsiblePanel>
                            </div>
                            <div className="flex-shrink-0 w-full md:w-1/2">
                                <CollapsiblePanel title="Image Options">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4">
                                        <div>
                                            <p>Image File:</p>
                                        </div>
                                        <div>
                                            <input type="file" accept="image/*" onChange={handleFileChange} />
                                        </div>
                                        <div>
                                            <p>Hide Background Dots:</p>
                                        </div>
                                        <div>
                                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                        </div>
                                        <div>
                                            <p>Image Size:</p>
                                        </div>
                                        <div>
                                            <input type="number" value={imageSize} onChange={handleImageSize} className='border border-gray-300 p-1' />
                                        </div>
                                        <div>
                                            <p>Margin:</p>
                                        </div>
                                        <div>
                                            <input type="number" min={0} value={imageMargin} onChange={handleImageMargin} className='border border-gray-300 p-1' />
                                        </div>
                                    </div>
                                </CollapsiblePanel>
                                <CollapsiblePanel title="Dots Options">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4">
                                        <div>
                                            <p>Dots Style:</p>
                                        </div>
                                        <div>
                                            <select value={selectedDotType} onChange={handleDotType} className='border border-gray-400 px-1'>
                                                <option value="rounded">Rounded</option>
                                                <option value="dots">Dots</option>
                                                <option value="classy">Classy</option>
                                                <option value="classy-rounded">Classy-rounded</option>
                                                <option value="square">Square</option>
                                                <option value="extra-rounded">Extra-rounded</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p>Dots Color:</p>
                                        </div>
                                        <div>
                                            <input type="color" value={selectedDotColor} onChange={handleDotColor} className='border border-gray-300 p-1 mt-2 md:mt-0 md:ml-2' />
                                        </div>
                                    </div>
                                </CollapsiblePanel>
                                <CollapsiblePanel title="Corners Dot Options">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4">
                                        <div>
                                            <p>Corner Dot Style:</p>
                                        </div>
                                        <div>
                                            <select value={selectedCornerDotType} onChange={handleCornerDotType} className='border border-gray-400 px-1'>
                                                <option value="dot">Dot</option>
                                                <option value="square">Square</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p>Corner Dot Color:</p>
                                        </div>
                                        <div>
                                            <input type="color" value={selectedCornerDotColor} onChange={handleCornerDotColor} className='border border-gray-300 p-1 mt-2 md:mt-0 md:ml-2' />
                                        </div>
                                    </div>
                                </CollapsiblePanel>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-full'>
                        <p className='text-center'>No Menu Found.</p>
                    </div>
                )
            }
        </>
    )
}

export default DesignQR;