import React from 'react'
import qrsvg from '../../assets/home_qr_scan.svg'

function Home() {
    return (
        <div>
            <h3 className='text-white text-center'>QR Bharat</h3>
            <img className='w-48 h-48' src={qrsvg} alt="QR Scan"
            />
        </div>
    )
}

export default Home