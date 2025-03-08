import React from "react";
import { Link } from "react-router-dom";

function WorkerCard() {
  return (
    <Link to={'/chatpanel'} className="p-4 bg-white shadow-md rounded-lg flex items-center gap-4 opacity-60 sm:w-[90%] h-32">
      <img src="" alt="" className="w-12 h-12 rounded-full object-cover" />
      <div className="flex-1">
        <h3 className="text-gray-800 font-semibold truncate">salm</h3>
        <p className="text-sm text-gray-600">Experience: 4 yrs</p>
        <p className="text-sm text-yellow-500">⭐ 5</p>
      </div>
    </Link>
  );
}

export default WorkerCard;