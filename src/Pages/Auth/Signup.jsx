import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import signupimg from "../../assets/Authimg/signupimg.jpg";
import { displaycategoryContext } from "../../Context/OtherPurpuseContextApi"; 
import { RegisterApi } from "../../services/allApi";

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
        alert("Passwords do not match!");
        return;
      }

      try {

        const result = await RegisterApi(Signupdata)
        console.log(result);
        if (result.status >= 200 && result.status <= 299) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          navigate("/");
        }

      } catch (error) {
        console.log(error);

      }

    }
    else {
      alert("please compleate form")
    }

  };

  const handleUserSignUp = async (e) => {
    e.preventDefault();

    setSignupdata({ ...Signupdata, roll: rollSelect });

    if (username && email && password && confpass && roll) {

      if (password !== confpass) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const result = await RegisterApi(Signupdata)

        console.log(result);
        if (result.status >= 200 && result.status <= 299) {
          
          sessionStorage.setItem("user", JSON.stringify(result.data.user))
          sessionStorage.setItem("token", result.data.token)
          navigate("/");
        }
        else {
          alert(result.response.data.message)
        }


      } catch (error) {
        console.log(error);

      }

    }
    else {
      alert("please complete form")
    }

  };


  return (
    <div className="h-screen flex justify-center items-center bg-[#234b84] bg-opacity-50">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${signupimg})`, opacity: 0.4 }}
      ></div>

      <div className="relative xl:w-[35%] lg:w-[40%] md:w-[55%] p-6 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/20">
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
                  {categoryResponse.map((category, index) => (
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
    </div>
  );
}

export default Signup;
