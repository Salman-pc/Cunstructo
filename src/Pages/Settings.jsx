import React, { useState, useEffect, useContext } from 'react';
import { FaSignOutAlt, FaCog, FaUser, FaBan, FaCommentDots, FaShieldAlt, FaEllipsisH, FaQuestionCircle } from "react-icons/fa";
import Header from '../Componets/Header';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { displayProfileContext } from '../Context/OtherPurpuseContextApi';
import serverUrl from '../services/serverUrl';
import proflieimg from '../assets/profileimg/profileimg.webp'

function Settings() {

    const {profileResponse}=useContext(displayProfileContext)
    const navigate = useNavigate();
    const location = useLocation();

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [profile,setprofile]=useState()

    useEffect(() => {
      setprofile(profileResponse)
    }, [profileResponse])
    

    useEffect(() => {
        if (location.pathname === "/settings") {
            navigate("/settings/profile");
        }
    }, [location.pathname, navigate]);

    const handilLogout=()=>{
        localStorage.clear()
        navigate('/')
    }


    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex-1 relative overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden rounded-br-sm rounded-tr-sm mt-1 py-2 px-4 bg-[#1877F2] text-white fixed z-20"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        <i className={`fa-solid ${isSidebarOpen ? "fa-caret-left" : "fa-caret-right"}`}></i>
                    </button>

                    {/* Left Sidebar */}
                    <div className={`absolute md:relative w-64 transform overflow-auto h-full md:w-1/3 lg:w-1/4 border-r border-gray-200 
                        transition-transform duration-300 z-10 bg-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

                        <div className="p-6 flex flex-col items-center">
                            {/* Profile Picture Upload */}
                            <label className='w-fit cursor-pointer mb-4 relative'>
                                <img className= {profile?.profilepic?" w-[100px] h-[100px] object-cover rounded-full border border-gray-300":" w-[100px] h-[100px] object-cover p-4 rounded-full border border-gray-300"} src={profile?.profilepic?`${serverUrl}/uploads/${profile?.profilepic}`: proflieimg} alt="Profile" />
                            </label>

                            <h3 className="text-lg font-semibold text-gray-800">{profile?.username}</h3>
                            <p className="text-sm text-gray-600">{profile?.email}</p>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="space-y-1 p-2">
                            <NavLink to={'/settings/profile'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <FaUser className="text-lg" />
                                Profile
                            </NavLink>

                            <NavLink to={'/settings/security&password'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <FaShieldAlt className="text-lg" />
                                Security & Privacy
                            </NavLink>

                            <NavLink to={'/settings/feedbackuser'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <FaCommentDots className="text-lg" />
                                Feedback
                            </NavLink>

                            <NavLink to={'/settings/help'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <FaQuestionCircle className="text-lg" />
                                Help
                            </NavLink>

                        
                            <button onClick={()=>handilLogout()} className="w-full cursor-pointer flex items-center gap-2 p-3 text-red-500 font-medium hover:bg-red-100 rounded-lg transition">
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className='flex-1 md:mt-10 w-full items-center overflow-auto p-6'>
                        <Outlet />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Settings;
