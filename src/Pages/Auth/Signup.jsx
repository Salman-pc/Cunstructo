import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signupimg from "../../assets/Authimg/signupimg.jpg";
import { displaycategoryContext } from "../../Context/OtherPurpuseContextApi";
import { RegisterApi } from "../../services/allApi";
import { toast } from "react-toastify";

function Signup({ isworker }) {

  const navigate = useNavigate();
  const { categoryResponse } = useContext(displaycategoryContext);

  const [rollSelect, setrollSelect] = useState(isworker ? "worker" : "user")
  const [Signupdata, setSignupdata] = useState({
    username: "",
    email: "",
    password: "",
    confpass: "",
    mobileno: "",
    aadhar: "",
    location: "",
    dob: "",
    gender: "",
    skills: [],
    experience: "",
    status: "",
    profile: "",
    roll: "",
  });

  useEffect(() => {
    setSignupdata((prev) => ({ ...prev, roll: rollSelect }));
  }, [rollSelect]);


  console.log(Signupdata);


  const handleInputChange = (e) => {
    setSignupdata({ ...Signupdata, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (category) => {
    setSignupdata((prev) => ({
      ...prev,
      skills: prev.skills.includes(category)
        ? prev.skills.filter((item) => item !== category)
        : [...prev.skills, category],
    }));
  };


  const { username, email, password, confpass, roll, mobileno, aadhar, location, skills, status } = Signupdata;

  const handleWorkerSignUp = async (e) => {

    e.preventDefault();
    console.log("worker registeration ", Signupdata);

    if (username && email && password && confpass && roll && mobileno && aadhar && location && skills && status) {



      if (password !== confpass) {
        toast.error("Passwords do not match!");
        return;
      }

      try {

        const result = await RegisterApi(Signupdata)
        console.log(result);
        if (result.status >= 200 && result.status <= 299) {
          localStorage.setItem("user", JSON.stringify(result.data.user))
          localStorage.setItem("token", result.data.token)
          navigate("/");
        }

      } catch (error) {
        console.log(error);
      }
    }
    else {
      toast.warning("please compleate form")
    }

  };

  const handleUserSignUp = async (e) => {
    e.preventDefault();

    setSignupdata({ ...Signupdata, roll: rollSelect });

    if (username && email && password && confpass && roll) {

      if (password !== confpass) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        const result = await RegisterApi(Signupdata)

        console.log(result);
        if (result.status >= 200 && result.status <= 299) {

          localStorage.setItem("user", JSON.stringify(result.data.user))
          localStorage.setItem("token", result.data.token)
          navigate("/");
        }
        else {
          toast.error(result.response.data.message)
        }
      } catch (error) {
        console.log(error);

      }

    }
    else {
      toast.warning("please complete form")
    }

  };


  return (
    <div className="h-screen flex w-full justify-center items-center bg-blue-800 bg-opacity-50">

      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Big soft gradient rectangle */}
        <div className="absolute animate-[float_6s_ease-in-out_infinite] w-[600px] h-[600px] bg-gradient-to-tr from-blue-200 via-blue-900 z-10 to-blue-200 opacity-20 rotate-12 top-[-200px] left-[-150px] rounded-3xl"></div>

        {/* Smaller rotated rectangle */}
        <div className="absolute animate-[float_6s_ease-in_infinite] w-[400px] h-[400px] bg-gradient-to-tr from-blue-400 to-blue-100 opacity-30 rotate-[-8deg] top-[200px] right-[-100px] rounded-3xl"></div>

        {/* Thin highlight rectangle */}
        <div className="absolute animate-[float_6s_ease-out_infinite] w-[300px] h-[80px] bg-gradient-to-r from-blue-400 to-blue-200 opacity-40 rotate-[-15deg] top-[50%] left-[-60px] rounded-2xl"></div>
      </div>

      {categoryResponse?.length > 0 ?
        <div className=" flex justify-center items-center w-full px-6">


          <div className="relative xl:w-[35%]  md:w-[65%] sm:w-[500px] p-6 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/20">
            <h2 className="text-2xl font-semibold text-white text-center">Sign Up</h2>

            <form className="mt-6 flex flex-col space-y-4">
              <input
                type="text"
                name="username"
                value={Signupdata.username}
                placeholder="Full Name"
                autoComplete="username"
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={Signupdata.email}
                placeholder="Email"
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
              />
              <div className="flex gap-4">
                <input
                  type="password"
                  name="password"
                  value={Signupdata.password}
                  placeholder="Password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                />
                <input
                  type="password"
                  name="confpass"
                  value={Signupdata.confpass}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  onChange={handleInputChange}
                  className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                />
              </div>

              {isworker && (
                <>
                  <div className="flex gap-4">
                    <input
                      type="tel"
                      name="mobileno"
                      value={Signupdata.mobileno}
                      placeholder="Mobile Number"
                      onChange={handleInputChange}
                      className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="aadhar"
                      value={Signupdata.aadhar}
                      placeholder="Aadhar Number"
                      onChange={handleInputChange}
                      className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={Signupdata.location}
                    placeholder="Location"
                    onChange={handleInputChange}
                    className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                  />
                  <div className="border border-white/30 rounded-lg p-3">
                    <label className="block text-white font-semibold mb-2">
                      Select Skills:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categoryResponse?.map((category, index) => (
                        <label key={index} className="flex items-center text-white">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={Signupdata.skills.includes(category.categoryname)}
                            onChange={() => handleCategoryChange(category.categoryname)}
                          />
                          {category.categoryname}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-white font-semibold mb-1">Status</label>
                    <select
                      name="status"
                      value={Signupdata.status}
                      onChange={handleInputChange}
                      className="p-3 rounded-lg bg-white/30 text-white focus:outline-none"
                    >
                      <option className="text-black" value="">
                        Select your status
                      </option>
                      <option className="text-black" value="available">
                        Available
                      </option>
                      <option className="text-black" value="unavailable">
                        Unavailable
                      </option>
                    </select>
                  </div>
                </>
              )}

              <button
                onClick={isworker ? handleWorkerSignUp : handleUserSignUp}
                className="p-3 mt-4 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div> :
        <div>
          <div className="text-center my-4">

            <span className="loading loading-dots text-gray-400 loading-xl"></span>

          </div>
        </div>
      }
    </div>
  );
}

export default Signup;
