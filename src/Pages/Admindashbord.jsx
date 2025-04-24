import React, { useState ,useEffect} from "react";
import { NavLink, Outlet, useNavigate,useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "../Componets/Header";


const AdminDashboard = () => {
  
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);


    useEffect(() => {
            if (location.pathname === "/admindashbord") {
                navigate("/admindashbord/addcatogory");
            }
        }, [location.pathname, navigate]);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
           <div className="fixed w-full">
                <Header />
    
           </div>
            <div className="relative max-w-7xl top-21 ">
                {/* Sidebar */}
                <div className={`fixed z-40 flex bg-opacity-50 md:h-fit h-screen transition-all duration-300 md:w-full ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
                    <div className="bg-white flex gap-3 shadow-lg h-full md:w-screen p-4">
                        <nav className="flex md:flex-row gap-2 w-fit mx-auto md:justify-center flex-col space-y-2 md:mt-0 mt-12">

                            <NavLink to={'/admindashbord/addcatogory'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 border-2 border-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <span className="text-2xl">📂</span>
                                <span className="text-md text-center font-medium">Add Category</span>
                            </NavLink>
                            <NavLink to={'/admindashbord/add_adds'}  className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 border-2 border-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <span className="text-2xl">📢</span>
                                <span className="text-md text-center font-medium">Change Ad</span>
                            </NavLink>
                            <NavLink to={'/admindashbord/userlist'}  className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 border-2 border-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <span className="text-2xl">👤</span>
                                <span className="text-md text-center font-medium">Users</span>
                            </NavLink>
                            <NavLink to={'/admindashbord/workerlist'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 border-2 border-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <span className="text-2xl">🔧</span>
                                <span className="text-md text-center font-medium">Workers</span>
                            </NavLink>
                            <NavLink to={'/admindashbord/feedbacklist'} className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 border-2 border-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <span className="text-2xl">📝</span>
                                <span className="text-md text-center font-medium">Feedbacks</span>
                            </NavLink>
                            <NavLink to={'/admindashbord/blocklist'}  className={({ isActive }) =>
                                `w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 border-2 border-gray-100 rounded-lg transition ${isActive ? 'bg-blue-200' : ''}`}>
                                <span className="text-2xl">🚫</span>
                                <span className="text-md text-center font-medium">Blocked</span>
                            </NavLink>
                            <button></button>
                        </nav>
                        {/* Close Button */}
                        <button onClick={() => setSidebarOpen(false)} className=" p-2 h-12 bg-[#1877F2] hover:bg-gray-300 text-gray-600 hover:text-gray-800 md:hidden">
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </div>

                {/* Sidebar Toggle Button */}
                <button onClick={() => setSidebarOpen(true)} className="bg-[#1877F2] fixed md:hidden mt-1 p-2 h-12 hover:bg-gray-300">
                    <ChevronLeft size={22} />
                </button>
            </div>

            {/* Main Content Area */}
            <div className="p-6 bg-white w-full text-center">
            <Outlet/>
            </div>
        </div>
    );
};

export default AdminDashboard;