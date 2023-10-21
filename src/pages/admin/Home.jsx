import React from 'react'
import qrsvg from '../../assets/home_qr_scan.svg'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen mx-4 sm:mx-0">
            <div className="mb-1 text-2xl sm:text-xl md:text-2xl">
                <p className="text-white font-semibold">QR Bharat</p>
            </div>
            <div className="w-48 h-48">
                <img src={qrsvg} alt="QR Scan" />
            </div>
            <div className="mb-3 text-base sm:text-base md:text-xl mt-1">
                <p className="text-white font-medium">Get your business digitalized with us.</p>
            </div>
            <div className="mb-1 text-center text-xs sm:text-base md:text-base">
                <p className="text-white font-thin">
                    Join a community of business owners who trust us for their digital menus and listings. We're here to support your success.
                </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
                <Link to="/signup" className="py-2 px-4 rounded-md bg-myColor2a hover:bg-myColor2b text-white text-sm sm:text-base md:text-base">
                    Signup
                </Link>
                <Link to="/login" className="py-2 px-4 rounded-md bg-myColor2a hover:bg-myColor2b text-white text-sm sm:text-base md:text-base">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Home;