import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import axios from 'axios';

function QRCodeGenerator({
    url,
    backgroundColorType,
    backgroundColor1,
    backgroundColor2,
    dotColor,
    image,
    width,
    height,
    dotType,
    cornerDotType,
    cornerSquareType,
    imageDots,
    imageSize,
    imageMargin,
    errorCorrectionLevel,
    margin,
    dotCornerColor,
    dotSquareColor,
}) {
    const qrCodeRef = useRef(null);
    const [selectedFormat, setSelectedFormat] = useState('png');

    const handleFormatChange = (event) => {
        setSelectedFormat(event.target.value);
    };

    const handleSave = async () => {
        const matchResult = url.match(/\/menu\/([^\/]+)\/(\d+)/);
        if (matchResult) {
            const gstNo = matchResult[1];
            const menuId = matchResult[2];

            const baseUrl = import.meta.env.VITE_BASE_URL;
            const userRestroEndpoint = `/api/user/has-restaurant`;
            const saveQREndpoint = `/api/restaurants/save-qr-code/${gstNo}/`;
            const token = localStorage.getItem('access_token');


            const responseUser = await axios.get(baseUrl + userRestroEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (qrCodeRef.current && qrCodeRef.current.qrCodeInstance) {
                const qrCodeInstance = qrCodeRef.current.qrCodeInstance;

                const canvas = qrCodeInstance._canvas;

                if (canvas) {
                    const dataUrl = canvas.toDataURL(`image/${selectedFormat}`);

                    const qrdata = {
                        restaurant: responseUser.data.restaurant_details.id,
                        qr_code_url: url,
                        qr_code_data: dataUrl
                    }

                    if (matchResult) {
                        axios
                            .post(baseUrl + saveQREndpoint, qrdata, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            })
                            .then((response) => {

                            })
                            .catch((error) => {
                                console.error('Error saving QR code:', error);
                            });
                    }
                }
            }
        }
    };

    const downloadQRCode = () => {
        if (qrCodeRef.current && qrCodeRef.current.qrCodeInstance) {
            const qrCodeInstance = qrCodeRef.current.qrCodeInstance;

            // Get the canvas element from the QRCodeStyling instance
            const canvas = qrCodeInstance._canvas;

            // Check if the canvas is available
            if (canvas) {
                // Generate a data URL for the QR code
                const dataUrl = canvas.toDataURL(`image/${selectedFormat}`);

                // Create an anchor element with a download attribute
                const anchor = document.createElement('a');
                anchor.href = dataUrl;
                anchor.download = `qrcode.${selectedFormat}`;

                // Trigger a click on the anchor element to start the download
                anchor.click();
                handleSave();
            }
        }
    };

    useEffect(() => {
        if (
            url ||
            backgroundColorType ||
            backgroundColor1 ||
            backgroundColor2 ||
            dotColor ||
            image ||
            width ||
            height ||
            dotType ||
            cornerDotType ||
            cornerSquareType ||
            imageDots ||
            imageSize ||
            imageMargin ||
            errorCorrectionLevel ||
            margin ||
            dotCornerColor ||
            dotSquareColor
        ) {
            qrCodeRef.current.innerHTML = '';

            const qrCodeInstance = new QRCodeStyling({
                width: width,
                height: height,
                margin: margin,
                data: url,
                image: image,
                imageOptions: {
                    crossOrigin: 'anonymous',
                    hideBackgroundDots: imageDots,
                    imageSize: imageSize,
                    margin: imageMargin,
                },
                dotsOptions: {
                    color: dotColor || '#000000',
                    type: dotType,
                },
                cornersDotOptions: {
                    color: dotCornerColor || '#000000',
                    type: cornerDotType,
                },
                cornersSquareOptions: {
                    color: dotSquareColor || '#000000',
                    type: cornerSquareType,
                },
                backgroundOptions: {
                    color:
                        backgroundColorType === 'single' ? backgroundColor1 : undefined,
                    gradient:
                        backgroundColorType === 'gradient'
                            ? {
                                type: 'linear',
                                rotation: Math.PI / 2,
                                colorStops: [
                                    { offset: 0, color: backgroundColor1 || '#ffffff' },
                                    { offset: 0.5, color: backgroundColor2 || '#000000' },
                                ],
                            }
                            : undefined,
                },
                qrOptions: {
                    errorCorrectionLevel: errorCorrectionLevel,
                },
            });

            qrCodeInstance.append(qrCodeRef.current);
            qrCodeRef.current.qrCodeInstance = qrCodeInstance;
        }
    }, [
        url,
        dotColor,
        image,
        width,
        height,
        dotType,
        cornerDotType,
        cornerSquareType,
        imageDots,
        imageSize,
        imageMargin,
        errorCorrectionLevel,
        margin,
        backgroundColorType,
        backgroundColor1,
        backgroundColor2,
        dotCornerColor,
        dotSquareColor,
    ]);

    return (
        <div className="flex flex-col items-center">
            <div className="text-center" ref={qrCodeRef}></div>
            <div className="flex items-center justify-center mt-4 text-sm">
                <>
                    <select
                        value={selectedFormat}
                        onChange={handleFormatChange}
                        className="border border-gray-300 p-0.5 mx-2"
                    >
                        <option value="png">PNG</option>
                        <option value="jpeg">JPEG</option>
                        <option value="webp">WEBP</option>
                    </select>
                    <button
                        className="bg-[#940B92] text-white py-1 px-3 rounded-md"
                        onClick={downloadQRCode}
                    >
                        Download QR
                    </button>
                </>
            </div>
        </div>
    );
}

export default QRCodeGenerator;