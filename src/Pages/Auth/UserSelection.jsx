import React from 'react'
import selectionimg from '../../assets/Authimg/selectionimg.jpg'
import { Link } from 'react-router-dom'

function UserSelection() {

  return (
    <div className="flex flex-col relative items-center bg-[#234b84] justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: `url(${selectionimg})`,
          opacity: 0.4,
        }}>
      </div>

      {/* Title */}
      <h1 className="text-3xl text-white font-semibold mb-8 z-10">Choose Your Role</h1>

      {/* Buttons */}
      <div className="flex space-x-6 z-10">
        <Link to={'/workersignup'}>
          <button className="w-40 h-14 bg-blue-600  hover:bg-blue-500  cursor-pointer 0 text-white rounded-lg shadow-lg  transition text-lg font-medium">
            Worker
          </button>
        </Link>
        <Link to={'/usersignup'}>
          <button className="w-40 h-14 cursor-pointer  bg-blue-600  hover:bg-blue-500 text-white rounded-lg shadow-lg  transition text-lg font-medium">
            User
          </button>
        </Link>
      </div>
    </div>
  )
}

export default UserSelection
