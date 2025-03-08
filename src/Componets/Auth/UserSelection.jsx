import React from 'react'
import { Link } from 'react-router-dom'

function UserSelection() {
  return (
    <div className="flex flex-col relative items-center bg-[#234b84] justify-center min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/portrait-two-successful-architects-foreman-discussing-design-project_496169-926.jpg?t=st=1741240420~exp=1741244020~hmac=ed3df44785c2eec141a3a40f8216f9963b6ff7aa80ce1b3d4873dd01404e0025&w=1480')",
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
