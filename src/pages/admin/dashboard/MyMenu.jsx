import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RouteLink from '../../../components/RouteLink';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineRocketLaunch, MdEdit } from 'react-icons/md';
import axios from 'axios';
import ContentEditable from 'react-contenteditable';
import AddMenuModal from '../../../components/modals/AddMenuModal';
import Modal from '../../../components/modals/FormModal';

function MyMenu() {
    const [isMenuModalOpen, setMenuModalOpen] = useState(false);
    const [menus, setMenus] = useState({});
    const [menuName, setMenuName] = useState('');
    const [refresh, setRefresh] = useState(false)

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
                    setMenus(responseData);
                    if (Array.isArray(responseData) && responseData.length > 0 && responseData[0].name !== null) {
                        setMenuName(responseData[0].name);
                    } else {
                        setMenuName('Menu');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const deleteMenu = (menuId) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const deleteEndpoint = `/api/menus/${menuId}/delete/`;
        const token = localStorage.getItem('access_token')

        if (token) {
            axios.delete(baseUrl + deleteEndpoint, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setRefresh(!refresh)
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const updateMenuName = (menu, name) => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const updateMenuEndpoint = `/api/menus/${menu.id}/update/`;
        const token = localStorage.getItem('access_token');

        const menuUpdate = {
            name: name,
            restaurant: menu.restaurant
        }

        if (token) {
            axios.put(baseUrl + updateMenuEndpoint, menuUpdate, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setMenuName(response.data.name);
                    setRefresh(!refresh)
                })
                .catch(error => {
                    // Handle error, e.g., show an error message
                });
        }
    };

    const openMenuModal = () => {
        setMenuModalOpen(true);
    };

    const closeMenuModal = () => {
        setMenuModalOpen(false);
        setRefresh(!refresh)
    };

    const handleAddSuccess = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        getMenus()
    }, [])

    useEffect(() => {
        getMenus()
    }, [refresh])

    return (
        <div className='px-4 py-4'>
            <div className='flex justify-between items-center'>
                {menus.length === 0 ? (<button onClick={openMenuModal} className="bg-yellow-200 hover:bg-yellow-300 text-black text-sm py-2 px-2 rounded-lg h-10">
                    Add Menu +
                </button>) : (<span></span>)}
                <RouteLink />
            </div>
            <div className='flex flex-col gap-4'>
                {Array.isArray(menus) && menus.length !== 0 ? (
                    menus.map((menu, index) => (
                        <div key={index} className='flex justify-between bg-white p-4 rounded-lg'>
                            <div className='flex items-center text-black gap-1'><ContentEditable html={menuName} className='cursor-pointer' onChange={(e) => updateMenuName(menu, e.target.value)} /><CiEdit size={14} color='black' /></div>
                            <Link to="/my-menu" className="flex flex-row items-center gap-1 cursor-default">
                                <MdOutlineRocketLaunch size={18} color={menu.launch_status === true ? "red" : "black"} />
                                <p className="text-xs" style={{ color: menu.launch_status === true ? "red" : "black" }}>
                                    {menu.launch_status === true ? "Launched" : "Not Launched"}
                                </p>
                            </Link>
                            <div className="flex gap-2">
                                <Link to="/preview-menu">
                                    <AiOutlineEye size={22} color='blue' />
                                </Link>
                                <Link to={`/edit-menu`}>
                                    <MdEdit size={21} color='green' />
                                </Link>
                                <AiOutlineDelete size={21} color='red' className='cursor-pointer' onClick={() => deleteMenu(menu.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center p-2'>No Data Found.</p>
                )}
            </div>
            <Modal isOpen={isMenuModalOpen} closeModal={closeMenuModal}>
                <AddMenuModal closeModal={closeMenuModal} onAddSuccess={handleAddSuccess} />
            </Modal>
        </div>
    );
}

export default MyMenu;