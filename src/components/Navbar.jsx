import React from "react";
import { MdPersonOutline, MdNotificationsNone } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
    const isSmallScreen = useMediaQuery({ maxWidth: 768 });

    return (
        <div className={`p-0 m-0 ${isSmallScreen ? "absolute top-0 right-0" : ""}`}>
            <div className={`max-w-full p-3.5 gap-2 sm:shadow-md ${isSmallScreen ? "bg-transparent" : "bg-white"} ${isSmallScreen ? "w-auto flex" : "flex justify-end"}`}>
                {isSmallScreen ? (
                    <>
                        <MdNotificationsNone size={25} />
                        <MdPersonOutline size={25} />
                    </>
                ) : (
                    <>
                        <MdNotificationsNone size={25} />
                        <MdPersonOutline size={25} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;