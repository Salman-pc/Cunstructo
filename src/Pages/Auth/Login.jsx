import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginimg from '../../assets/Authimg/loginimg.jpg';
import { LoginApi } from '../../services/allApi';

function Login() {
    const navigate = useNavigate();
    const [logindata, setlogindata] = useState({ email: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = logindata;

        if (email && password) {

            try {

                const result = await LoginApi(logindata)

                if (result.status >= 200 && result.status <= 299) {

                    result.data.user.roll == "user" || result.data.user.roll == "worker" ? navigate('/') : navigate('/admindashbord')
                    console.log("resyk", result);

                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                } else {
                    console.log(result);

                    alert(result.response
                        .data)
                }

            } catch (error) {
                console.log(error);

            }

        }
        else {
            alert("pleae complet form")
        }

    }

    return (
        <div className="h-screen flex justify-center items-center bg-[#1877F2] bg-opacity-80">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${loginimg})`, opacity: 0.3 }}
            ></div>

            <div className="relative w-[400px] p-6 rounded-2xl backdrop-blur-md bg-white/20 shadow-xl border border-white/30">
                <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
                <form className="mt-6 flex flex-col space-y-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={logindata.email}
                        autoComplete="username"
                        onChange={(e) => setlogindata({ ...logindata, email: e.target.value })}
                        className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-100 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={logindata.password}
                        autoComplete="current-password"
                        onChange={(e) => setlogindata({ ...logindata, password: e.target.value })}
                        className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-100 focus:outline-none"
                    />
                    <button type="submit" className="p-3 mt-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
                <p className="text-gray-300 mt-4 text-center">
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
