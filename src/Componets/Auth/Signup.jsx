import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ isworker }) {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleWorkerSignUp = (e) => {
    e.preventDefault();
    navigate("/chats");
  };

  const handleUserSignUp = (e) => {
    e.preventDefault();
    navigate("/dashbord");
  };

  // Handle Category Selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#234b84] bg-opacity-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/architect-man-showing-something-project-his-colleague-foreman_496169-959.jpg?t=st=1741246136~exp=1741249736~hmac=2cdeda01d73d63b010d5c2cf879c81e618a9d29d84306139a3d0302ef715c167&w=2000')",
          opacity: 0.4,
        }}
      ></div>

      {/* Signup Form */}
      <div className="relative xl:w-[35%] lg:w-[40%] md:w-[55%] p-6 rounded-2xl backdrop-blur-md bg-white/20 shadow-lg border border-white/20">
        <h2 className="text-2xl font-semibold text-white text-center">Sign Up</h2>

        <form className="mt-6 flex flex-col space-y-4">
          {/* Full Name & Email */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="flex gap-4">
            <input
              type="password"
              placeholder="Password"
              className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
            />
          </div>

          {/* Worker-Specific Fields */}
          {isworker && (
            <>
              {/* Mobile Number & Aadhar Number */}
              <div className="flex gap-4">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Aadhar Number"
                  className="p-3 w-1/2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
                />
              </div>

              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                className="p-3 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none"
              />

              {/* Categories Multi-Select */}
              <div className="border border-white/30 rounded-lg p-3">
                <label className="block text-white font-semibold mb-2">
                  Select Categories:
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Plumber", "Electrician", "Carpenter"].map((category) => (
                    <label key={category} className="flex items-center text-white">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col">
                <label className="text-white font-semibold mb-1">Status</label>
                <select className="p-3 rounded-lg bg-white/30 text-white focus:outline-none">
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

          {/* Sign Up Button */}
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
