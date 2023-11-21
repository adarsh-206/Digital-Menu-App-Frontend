import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { MdPreview } from 'react-icons/md';
import { AiOutlineAntDesign } from 'react-icons/ai';
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ children }) => {
    const isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
    const [open, setOpen] = useState(isTabletMid ? false : true);
    const sidebarRef = useRef();
    const { pathname } = useLocation();

    const toggleSidebar = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (isTabletMid) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [isTabletMid]);

    useEffect(() => {
        isTabletMid && setOpen(false);
    }, [pathname]);

    const Nav_animation = isTabletMid
        ? {
            open: {
                x: 0,
                width: "16rem",
                transition: {
                    damping: 40,
                },
            },
            closed: {
                x: -250,
                width: 0,
                transition: {
                    damping: 40,
                    delay: 0.15,
                },
            },
        }
        : {
            open: {
                width: "16rem",
                transition: {
                    damping: 40,
                },
            },
            closed: {
                width: "4rem",
                transition: {
                    damping: 40,
                },
            },
        };

    return (
        <div>
            <div
                onClick={() => setOpen(false)}
                className={`md:hidden fixed inset-0 max-h-screen shadow-right z-[998] bg-black/50 ${open ? "block" : "hidden"}`}
            ></div>
            <motion.div
                ref={sidebarRef}
                variants={Nav_animation}
                initial={{ x: isTabletMid ? -250 : 0 }}
                animate={open ? "open" : "closed"}
                className="bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen"
            >
                <div className="flex items-center px-3 gap-2.5 font-medium border-b py-[0.547rem] border-slate-300 shadow-md">
                    <img
                        src="https://img.icons8.com/arcade/64/xbox-menu.png"
                        width={35}
                        alt=""
                    />
                    <span className={`text-lg font-semibold whitespace-pre ${open ? "block" : "hidden"}`}>
                        My Restaurant
                    </span>
                </div>

                <div className="flex flex-col h-full py-5">
                    <ul className="whitespace-pre p-0 m-0 text-[1.1rem] flex flex-col gap-1 font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-[68%] h-[70%]">
                        <li className={`py-3 pl-0 pr-0 ${pathname === "/dashboard" ? "bg-slate-200" : ""}`}>
                            <Link to={"/dashboard"} className="link text-black flex gap-2 px-4">
                                <MdOutlineDashboardCustomize size={23} className="min-w-max" />
                                <span className={open ? "block" : "hidden"}>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`py-3 pl-0 pr-0 ${pathname === "/my-menu" ? "bg-slate-200" : ""}`}>
                            <Link to={"/my-menu"} className="link text-black flex gap-2 px-4">
                                <BsMenuButtonWideFill size={20} className="min-w-max" />
                                <span className={open ? "block" : "hidden"}>My Menu</span>
                            </Link>
                        </li>
                        <li className={`py-3 pl-0 pr-0 ${pathname === "/preview-menu" ? "bg-slate-200" : ""}`}>
                            <Link to={"/preview-menu"} className="link text-black flex gap-2 px-4">
                                <MdPreview size={23} className="min-w-max" />
                                <span className={open ? "block" : "hidden"}>Preview Menu</span>
                            </Link>
                        </li>
                        <li className={`py-3 pl-0 pr-0 ${pathname === "/design-qr" ? "bg-slate-200" : ""}`}>
                            <Link to={"/design-qr"} className="link text-black flex gap-2 px-4">
                                <AiOutlineAntDesign size={23} className="min-w-max" />
                                <span className={open ? "block" : "hidden"}>Design QR</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <motion.div
                    onClick={() => {
                        setOpen(!open);
                    }}
                    animate={
                        open
                            ? {
                                x: 0,
                                y: 0,
                                rotate: 0,
                            }
                            : {
                                x: -10,
                                y: -200,
                                rotate: 180,
                            }
                    }
                    transition={{ duration: 0 }}
                    className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
                >
                    <IoIosArrowBack size={25} />
                </motion.div>
            </motion.div>
            <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
                <MdMenu size={25} />
            </div>
            {children}
        </div>
    );
};

export default Sidebar;