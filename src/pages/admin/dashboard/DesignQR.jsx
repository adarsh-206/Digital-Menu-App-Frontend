import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function DesignQR() {
    const [url, setUrl] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [menuId, setMenuId] = useState();
    const [isLaunch, setIsLaunch] = useState(false);

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
        setUrl(localStorage.getItem('qr_code_link'))
    }, [])

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

    useEffect(() => {
        getMenus()
    })

    return (
        <div className="flex items-center justify-center h-[80vh]">
            {isLaunch ? (
                <div className="bg-white p-4 shadow-md text-center rounded-lg">
                    <QRCode value={url} className="mx-auto" />
                    <div className="mt-5 flex items-center gap-4 border p-2 rounded-lg">
                        <p className="text-center text-gray-400 text-xs">{url}</p>
                        <button
                            className={`bg-${isCopied ? 'green' : 'blue'}-500 hover:bg-${isCopied ? 'green' : 'blue'}-700 text-xs text-white font-semibold py-1 px-3 rounded-full w-24`}
                            onClick={copyToClipboard}
                        >
                            {isCopied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>
            ) : (
                <p className='text-center'>No Launched Menu.</p>
            )}
        </div>
    )
}

export default DesignQR;