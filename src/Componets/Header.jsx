import React from "react";
import { Home, MessageSquare, Settings } from "lucide-react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import cunstructoimg from "../assets/cunstructoimg.png";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [openMenu, setOpenMenu] = React.useState(false);

    const handleCheckToken = () => {
        toast.warning("Please login");
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <header className="w-full bg-[#1877F2] shadow-md border-b border-blue-600">
            <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
                {/* Logo */}
                <Link to={'/'}><img className="w-32 h-10" src={cunstructoimg} alt="logo" /></Link>

                {/* Right Section */}
                <div className="flex py-4 sm:gap-6 gap-3 items-center">
                    {/* <Link to="/">
                        <Home className="text-white w-6 h-6 cursor-pointer hover:opacity-80 transition" />
                    </Link> */}
                    {user?.roll !== "admin" && (
                        <>

                            {token ? (
                                <Link to="/chats">
                                    <MessageSquare className="text-white w-6 h-6 cursor-pointer hover:opacity-80 transition" />
                                </Link>
                            ) : (
                                <MessageSquare
                                    onClick={handleCheckToken}
                                    className="text-white w-6 h-6 cursor-pointer hover:opacity-80"
                                />
                            )}
                        </>
                    )}

                    {/* Dropdown Menu */}
                    <Menu open={openMenu} handler={setOpenMenu}>
                        <MenuHandler>
                            <div className="flex items-center border p-1 rounded-4xl gap-3 text-white cursor-pointer">
                                <div className="border rounded-full p-1">
                                    <FaUser className="text-white w-4 h-4" />
                                </div>
                                {!token && (
                                    <Link to="/login" className="text-[14px] sm:block hidden font-bold">
                                        Login
                                    </Link>
                                )}
                                <ChevronDownIcon
                                    className={`h-5 w-5 transition-transform ${openMenu ? "rotate-180" : ""}`}
                                />
                            </div>
                        </MenuHandler>

                        <MenuList className="z-50 w-[12rem] border-0 flex flex-col gap-2">
                            {!token && (
                                <>
                                    <Link to="/login" className="sm:hidden block">
                                        <MenuItem className="flex items-center p-[1px] gap-2">
                                            <FaUser className="text-gray-400 w-6" />
                                            <Typography variant="small" className="font-medium">
                                                Login
                                            </Typography>
                                        </MenuItem>
                                    </Link>

                                    <Link to="/userSelection">
                                        <MenuItem className="flex items-center p-1 gap-2">
                                            <FaUserPlus className="text-gray-400 w-6" />
                                            <Typography variant="small" className="font-medium">
                                                Sign Up
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                </>
                            )}

                            {user?.roll !== "admin" && (
                                <>
                                    {token ? (
                                        <Link to="/settings">
                                            <MenuItem className="flex items-center p-1  gap-2">
                                                <Settings className="text-gray-400 w-6" />

                                                <Typography variant="small" className="font-medium">
                                                    Settings
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    ) : (
                                        <MenuItem onClick={handleCheckToken} className="flex items-center p-1 gap-2">
                                            <Settings className="text-gray-400 w-5" />
                                            <Typography variant="small" className="font-medium flex">
                                                Settings
                                            </Typography>
                                        </MenuItem>
                                    )}

                                    <hr className="my-1 border-blue-gray-50" />
                                </>
                            )}

                            {
                                user.roll == "admin" && <Link to="/admindashbord/addcatogory">
                                    <MenuItem className="flex items-center p-1 pl-0  gap-2">
                                        <Settings className="text-gray-400 w-6" />

                                        <Typography variant="small" className="font-medium">
                                            Admin Dashboard
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            }

                            <MenuItem onClick={handleSignOut} className="flex items-center p-1 gap-2">
                                <svg
                                    width="16"
                                    height="14"
                                    viewBox="0 0 16 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                                        fill="#90A4AE"
                                    />
                                </svg>
                                <Typography variant="small" className="font-medium">
                                    Sign Out
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </div>
        </header >
    );
}

export default Header;
