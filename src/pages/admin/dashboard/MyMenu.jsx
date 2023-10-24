import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RouteLink from '../../../components/RouteLink';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineDelete } from 'react-icons/ai';
import { GrFormEdit } from 'react-icons/gr';
import { MdOutlineRocketLaunch } from 'react-icons/md';

function MyMenu() {
    const [isEyeVisible, setIsEyeVisible] = useState(false);
    const [launchStatus, setLaunchStatus] = useState("Not Launched");

    const toggleEyeVisibility = () => {
        setIsEyeVisible(!isEyeVisible);
    };

    const toggleRocketLaunch = () => {
        if (launchStatus === "Not Launched") {
            setLaunchStatus("Launched");
        } else {
            setLaunchStatus("Not Launched");
        }
    };

    return (
        <div className='px-4 py-4'>
            <div className='flex justify-between items-center'>
                <Link to="/add-menu" className="bg-yellow-200 hover:bg-yellow-300 text-black text-sm py-2 px-2 rounded-lg h-10">
                    Add Menu +
                </Link>
                <RouteLink />
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex justify-between bg-white p-4 rounded-lg'>
                    <p>Menu 1</p>
                    <Link to="/my-menu" onClick={toggleRocketLaunch} className="flex flex-row items-center gap-1">
                        <MdOutlineRocketLaunch size={22} color={launchStatus === "Launched" ? "red" : "black"} />
                        <p className="text-xs" style={{ color: launchStatus === "Launched" ? "red" : "black" }}>
                            {launchStatus}
                        </p>
                    </Link>
                    <div className="flex gap-2">
                        <Link to="/my-menu" onClick={toggleEyeVisibility}>
                            {isEyeVisible ? <AiOutlineEyeInvisible size={21} color='black' /> : <AiOutlineEye size={21} color='black' />}
                        </Link>
                        <Link to="/edit-menu">
                            <GrFormEdit size={22} color='blue' />
                        </Link>
                        <Link to="/my-menu">
                            <AiOutlineDelete size={21} color='red' />
                        </Link>
                    </div>
                </div>
                <div className='flex justify-between bg-white p-4 rounded-lg'>
                    <p>Menu 2</p>
                    <Link to="/my-menu" onClick={toggleRocketLaunch} className="flex flex-row items-center gap-1">
                        <MdOutlineRocketLaunch size={22} color={launchStatus === "Launched" ? "red" : "black"} />
                        <p className="text-xs" style={{ color: launchStatus === "Launched" ? "red" : "black" }}>
                            {launchStatus}
                        </p>
                    </Link>
                    <div className="flex gap-2">
                        <Link to="/my-menu" onClick={toggleEyeVisibility}>
                            {isEyeVisible ? <AiOutlineEyeInvisible size={21} color='black' /> : <AiOutlineEye size={21} color='black' />}
                        </Link>
                        <Link to="/my-menu">
                            <GrFormEdit size={22} color='blue' />
                        </Link>
                        <Link to="/my-menu">
                            <AiOutlineDelete size={21} color='red' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyMenu;