import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate()

    const hadileLogin=()=>{
        navigate("/admindashbord")
    }
    return (
        <div className="h-screen flex justify-center items-center bg-[#234b84]  bg-opacity-50">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://img.freepik.com/free-photo/crop-architect-opening-blueprint_23-2147710985.jpg?t=st=1741237552~exp=1741241152~hmac=c2911fe7907373d149e2bd9b1af061d7e75e10cad0832cfede1e84b153ed7fe3&w=2000')",
                    opacity: 0.4, // Adjust opacity if needed
                }}
            ></div>

            <div className="relative w-[450px] p-8 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/20">
                <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
                <form className="mt-6 flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-100 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-100 focus:outline-none"
                    />

                    <button onClick={hadileLogin} className="p-3 mt-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
                <p className="text-gray-300 mt-4 text-center">
                    Don't have an account?{' '}
                    <Link to={'/userSelection'} className="text-blue-600 cursor-pointer hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
