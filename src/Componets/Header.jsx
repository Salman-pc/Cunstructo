import React from "react";
import { Home, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="w-full bg-[#1877F2] shadow-md border-b border-blue-600">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Left Section: Logo / Title */}
                <h1 className="text-3xl font-extrabold text-white tracking-wide">Constructo</h1>

                {/* Right Section: Profile Icon */}
                <div className="flex gap-6">
                    <Link to={'/dashbord'}>
                        <Home className="text-white w-6 h-6 cursor-pointer hover:opacity-80 transition" />
                    </Link>
                    <Link to={'/chats'}>
                        <MessageSquare className="text-white w-6 h-6 cursor-pointer hover:opacity-80 transition" />
                    </Link>
                    <Link to={'/profile'}>
                        <User className="text-white w-6 h-6 cursor-pointer hover:opacity-80 transition" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
