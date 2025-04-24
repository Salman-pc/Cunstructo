import React from 'react'
import { useNavigate } from 'react-router-dom'

function Pnf() {
    const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-600">Oops! The page you are looking for doesn't exist.</p>
      <button onClick={()=>navigate('/')} className='mt-3 cursor-pointer border shadow p-2 font-semibold'>Go Back</button>
    </div>
  )
}

export default Pnf
