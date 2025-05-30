import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginApi } from '../../services/allApi';
import { FaUser, FaLock} from "react-icons/fa";
import { toast } from 'react-toastify';
import { LoginUserContext } from '../../Context/OtherPurpuseContextApi';

function Login() {
    const navigate = useNavigate();
    const [logindata, setlogindata] = useState({ email: "", password: "" });
    const {setloginUserResposne}=useContext(LoginUserContext)


    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = logindata;

        if (email && password) {

            try {

                const result = await LoginApi(logindata)

                if (result.status >= 200 && result.status <= 299) {

                    result.data.user.roll == "user" || result.data.user.roll == "worker" ? navigate('/') : navigate('/admindashbord')
                    
                    localStorage.setItem("user", JSON.stringify(result.data.user))
                    localStorage.setItem("token", result.data.token)
                    setloginUserResposne(result)
                } else {
                
                    toast.warning(result.response
                        .data)
                }

            } catch (error) {
                console.log(error);

            }

        }
        else {
            toast.warning("pleae complet form")
        }

    }

    return (
        <div className="h-screen overflow-hidden relative flex justify-center items-center  bg-gradient-to-r from-blue-700 to-blue-400 ">


            <div className=" bg-gradient-to-b  from-blue-800 to-blue-500 shadow-2xl lg:rounded-2xl overflow-hidden flex flex-col items-center justify-center">

                {/* Background Shapes */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute animate-[float_6s_ease-in-out_infinite] w-[300px] h-[300px] bg-blue-400 top-[-80px] left-[-80px] rounded-full opacity-30"></div>
                    <div className="absolute animate-[float_6s_ease-in-out_infinite] w-[400px] h-[400px] bg-blue-600 bottom-[-100px] right-[-100px] rounded-full opacity-40"></div>
                    <div className="absolute animate-[float_6s_ease-in-out_infinite] w-[200px] h-[200px] bg-blue-300 bottom-[150px] left-[100px] rounded-full opacity-50"></div>
                </div>
                
            </div>
            {/* Content */}

            <div className="relative flex flex-col items-center justify-center lg:w-[30%] w-[350px] h-[400px] rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/20 ">
                <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
                <form className="mt-6  w-full p-6 flex justify-center flex-col space-y-4" onSubmit={handleLogin}>
                    <div className="relative w-full ">
                        <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-100" />
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={logindata.email}
                            onChange={(e) => setlogindata({ ...logindata, email: e.target.value })}
                            className=" w-full py-2.5 pl-10 bg-white/30 text-white rounded-lg focus:outline-none placeholder-gray-200"
                            required
                        />
                    </div>
                    <div className="relative ">
                        <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-100" />
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            value={logindata.password}
                            onChange={(e) => setlogindata({ ...logindata, password: e.target.value })}
                            className="w-full py-2.5 pl-10 bg-white/30 text-white rounded-lg focus:outline-none placeholder-gray-200"
                            required
                        />
                    </div>
                    <button type="submit" className="p-3.5  mt-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
                <p className="text-gray-300  text-center">
                    Don't have an account?{' '}
                    <Link to={'/userSelection'} className="text-white font-semibold underline hover:text-gray-100">
                        Sign Up
                    </Link>
                </p>


            </div>


        </div>
    );
}

export default Login;
