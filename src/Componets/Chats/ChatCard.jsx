// ChatCard.jsx
import React from 'react';
import { FaCheckDouble } from "react-icons/fa";

function ChatCard({ onSelect }) {
  return (
    <div 
      className="flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer w-full h-20" 
      onClick={onSelect}
    >
      {/* Profile Picture */}
      <div className="w-12 h-12 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
        P
      </div>

      {/* Chat Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h4 className="text-gray-800 font-medium truncate">Plumber Service</h4>
          <span className="text-xs text-gray-500 whitespace-nowrap">10:45 AM</span>
        </div>
        <p className="text-gray-600 text-sm flex items-center gap-1 truncate">
          <FaCheckDouble className="text-green-500" /> 
          <span className="truncate">Your service request is confirmed for Friday at 2:00 PM</span>
        </p>
      </div>
    </div>
  );
}

export default ChatCard;