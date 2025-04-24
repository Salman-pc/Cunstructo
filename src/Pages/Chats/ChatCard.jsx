import React from 'react';
import profileimg from '../../assets/profileimg/profileimg.webp'
import serverUrl from '../../services/serverUrl';

function ChatCard({workers, onSelect }) {


const toReciverData = JSON.parse(sessionStorage.getItem("toReciverData"))
  
  return (
    <div 
      className="flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer w-full h-18" 
      onClick={onSelect}
    >
      {/* Profile Picture */}
      <div className="w-12 h-12 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
      <img className={workers?.profilepic?'w-11 h-11 shadow-md rounded-full':'w-11 p-2 bg-white h-11 shadow-md rounded-full'} src={ workers?.profilepic?`${serverUrl}/uploads/${workers.profilepic}`:profileimg} alt=""  />
      </div>

      {/* Chat Details */}
      <div className="flex-1 min-w-48">
        <div className="flex justify-between items-center">
          <h4 className="text-gray-800 font-medium truncate">{workers?.username}</h4>
          {/* <span className="text-xs text-gray-500 whitespace-nowrap">10:45 AM</span> */}
        </div>
        <p className="text-gray-600 text-sm flex items-center gap-1 truncate">
        
        {workers?.skills.slice(0,2).join(', ')}
        {workers?.skills.length > 2 && '...'}
        </p>
      </div>
    </div>
  );
}

export default ChatCard;