import React from 'react'
import { Wrench } from "lucide-react";
import { Link } from 'react-router-dom';

function CatCard() {
  
  return (
    <div >
        <Link to={'/catogoryselect'}  className="p-6 bg-blue-600 text-white rounded-lg shadow-md flex flex-col items-center">
            {/* Plumber Icon */}
            {/* <Wrench size={40} className="mb-2" /> */}

            <img className='w-40 h-28'  src="https://t4.ftcdn.net/jpg/04/87/98/13/360_F_487981328_xWRqn9P0zYoX6NZsgGVooM6SmxLPn3vV.jpg" alt="" srcset="" />
            
            {/* Plumber Text */}
            <h3 className="text-lg font-semibold">Plumber</h3>
        </Link>
    </div>
  )
}

export default CatCard