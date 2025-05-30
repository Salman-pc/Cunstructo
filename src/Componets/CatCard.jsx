import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { displaycategoryContext } from "../Context/OtherPurpuseContextApi";
import serverUrl from "../services/serverUrl";
import { toast } from "react-toastify";

function CatCard() {
  const { categoryResponse } = useContext(displaycategoryContext);



  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 10000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const handleCheckToken = (navigateUrl) => {

    if (token) {
      if(user.roll=="admin"){
        return
      }
      else{
        navigate(navigateUrl);
      }
      
    } else {
      toast.warning("Please login to access this category.");
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
              className="p-6 bg-[#1877F2] text-white rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-blue-600 transition"
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
        <div className="text-center my-4">
          {showMessage ? (
            <p className="text-lg text-gray-500">No categories available. Please check back later.</p>
          ) : (
            <span className="loading loading-dots text-gray-400 loading-xl"></span>
          )}
        </div>
      )
      }
    </div >
  );
}

export default CatCard;
