import React, { useState } from 'react'
import { FaSignOutAlt, FaCog, FaUserCircle, FaBan, FaCommentDots, FaEllipsisH, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";
import Header from '../Componets/Header';


function Profile() {
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header/>
            
            <div className="flex-1 relative overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden rounded-br-sm rounded-tr-sm mt-1 py-2 px-4 bg-[#1877F2] text-white fixed z-20"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    > <i className={`fa-solid ${isSidebarOpen ? "fa-caret-left" : "fa-caret-right"}`}></i>
                         
                    </button>

                    {/* Left Sidebar */}
                    <div className={`absolute md:relative w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 z-10 bg-white h-full md:w-1/3 lg:w-1/4 border-r border-gray-200`}>
                        <div className="p-6 flex flex-col items-center">
                            
                            <label className='w-fit cursor-pointer mb-4'>
                                <input className='hidden' type="file" />
                                <img src="" alt="" />
                                <FaUserCircle className="text-gray-500 text-7xl " />
                            </label>
                            <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
                            <p className="text-sm text-gray-600">johndoe@example.com</p>
                        </div>
                        
                        <nav className="space-y-1 p-2">
                        
    
                        {/* Options */}

                            <button className="w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                                <FaCog className="text-lg" />
                                Settings
                            </button>
                            <button className="w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                                <FaCommentDots className="text-lg" />
                                Feedback
                            </button>
                            <button className="w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                                <FaShieldAlt className="text-lg" />
                                Privacy
                            </button>
                            <button className="w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                                <FaQuestionCircle className="text-lg" />
                                Help
                            </button>
                            <button className="w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                                <FaBan className="text-lg" />
                                Blocked
                            </button>
                            <button className="w-full flex items-center gap-2 p-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                                <FaEllipsisH className="text-lg" />
                                More Options
                            </button>
                            <button className="w-full flex items-center gap-2 p-3 text-red-500 font-medium hover:bg-red-100 rounded-lg transition">
                                <FaSignOutAlt className="text-lg" />
                                Logout
                            </button>
                        
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-auto p-6">
                        <div className="max-w-2xl mx-auto">
                            <p className="text-xl font-bold text-gray-800 mb-6 md:mt-0 mt-6">Profile Settings</p>
                            
                            <form className="space-y-3 px-4">
                                
                                <div className="  ">

                                    <div className="grid gap-3">
                                        <div>
                                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input
                                                id="fullName"
                                                type="text"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="johndoe@example.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="">
    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                            <input
                                                id="password"
                                                type="password"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                       
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                            <input
                                                id="mobile"
                                                type="tel"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="+1 234 567 890"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                            <input
                                                id="dob"
                                                type="date"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <fieldset>
                                                <legend className="block text-sm font-medium text-gray-700 mb-1">Gender</legend>
                                                <div className="flex flex-wrap gap-4">
                                                    {['male', 'female', 'other'].map((gender) => (
                                                        <label key={gender} className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value={gender}
                                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <span className="capitalize">{gender}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>

                                <div className="">
                                    <div className="space-y-3">
                                        <div>
                                            <fieldset>
                                                <legend className="block text-sm font-medium text-gray-700 mb-1">Skills</legend>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    {["Plumber", "Electrician", "Carpenter", "Painter", "Welder"].map((skill) => (
                                                        <label key={skill} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                                            />
                                                            <span>{skill}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                                <input
                                                    id="experience"
                                                    type="number"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    min="0"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                                                <select 
                                                    id="availability"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="unavailable">Unavailable</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-5 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Updadte Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile