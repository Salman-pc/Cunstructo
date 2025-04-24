import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { displaycategoryContext } from "../Context/OtherPurpuseContextApi";
import serverUrl from "../services/serverUrl";

function CatCard() {
  const { categoryResponse } = useContext(displaycategoryContext);

  console.log(categoryResponse,"categoryResponsecategoryResponsecategoryResponse");
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token")
  const user = sessionStorage.getItem("user")


  const handleCheckToken = (navigateUrl) => {
    if (token) {
      navigate(navigateUrl);
    } else {
      alert("Please login to access this category.");
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div>
      {categoryResponse?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4">
          {categoryResponse.map((item) => (
            <div
              key={item._id}
              onClick={() => handleCheckToken(`/catogoryselect?field=${item.categoryname}`)}
              className="p-6 bg-blue-600 text-white rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-blue-700 transition"
            >
              <div className="justify-center shadow-md w-fit flex bg-white rounded-full">
                <img
                  className="w-32 h-32 object-cover rounded-full"
                  src={`${serverUrl}/uploads/${item.categoryimg}`}
                  alt={item.categoryname}
                  onError={(e) => (e.target.src = "/fallback-image.png")} // Fallback image
                />
              </div>
              <h3 className="text-md font-bold mt-3 px-2 text-center">{item.categoryname}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No categories available.</p>
      )}
    </div>
  );
}

export default CatCard;
