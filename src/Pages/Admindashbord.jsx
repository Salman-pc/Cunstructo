import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Componets/Header';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div>
            <Header />
            <div className="grid max-w-7xl bg-white h-full justify-center mx-auto mt-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 p-6">
                
                {/* Add Category Card */}
                <div
                    onClick={() => handleCardClick('categories')}
                    role="button"
                    tabIndex="0"
                    className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200"
                    onKeyPress={(e) => e.key === 'Enter' && handleCardClick('categories')}
                >
                    <div className="text-5xl mb-4">📂</div>
                    <h2 className="text-md font-semibold text-gray-800">Add Category</h2>
                    <p className="text-gray-500 mt-2">Manage service categories</p>
                </div>

                {/* Advertisement Card */}
                <div
                    onClick={() => handleCardClick('advertisements')}
                    role="button"
                    tabIndex="0"
                    className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200"
                    onKeyPress={(e) => e.key === 'Enter' && handleCardClick('advertisements')}
                >
                    <div className="text-5xl mb-4">📢</div>
                    <h2 className="text-md font-semibold text-gray-800">Change Advertisement</h2>
                    <p className="text-gray-500 mt-2">Update ad content</p>
                </div>

                {/* Users Card */}
                <div
                    onClick={() => handleCardClick('users')}
                    role="button"
                    tabIndex="0"
                    className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200"
                    onKeyPress={(e) => e.key === 'Enter' && handleCardClick('users')}
                >
                    <div className="text-5xl mb-4">👤</div>
                    <h2 className="text-md font-semibold text-gray-800">Users</h2>
                    <p className="text-gray-500 mt-2">Manage user accounts</p>
                </div>

                {/* Workers Card */}
                <div
                    onClick={() => handleCardClick('workers')}
                    role="button"
                    tabIndex="0"
                    className="bg-white shadow-lg rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-gray-200"
                    onKeyPress={(e) => e.key === 'Enter' && handleCardClick('workers')}
                >
                    <div className="text-5xl mb-4">🔧</div>
                    <h2 className="text-md font-semibold text-gray-800">Workers</h2>
                    <p className="text-gray-500 mt-2">Manage worker profiles</p>
                </div>

                {/* Blocked List Card */}
                <div
                    onClick={() => handleCardClick('blocked')}
                    role="button"
                    tabIndex="0"
                    className="bg-red-100 shadow-lg rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-red-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleCardClick('blocked')}
                >
                    <div className="text-5xl mb-4">🚫</div>
                    <h2 className="text-md font-semibold text-red-600">Blocked List</h2>
                    <p className="text-red-500 mt-2">Manage blocked users & workers</p>
                </div>

                {/* Feedbacks Card - NEW ADDITION */}
                <div
                    onClick={() => handleCardClick('feedbacks')}
                    role="button"
                    tabIndex="0"
                    className="bg-blue-100 shadow-lg rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleCardClick('feedbacks')}
                >
                    <div className="text-5xl mb-4">📝</div>
                    <h2 className="text-md font-semibold text-blue-600">Feedbacks</h2>
                    <p className="text-blue-500 mt-2">View user feedback & reports</p>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
