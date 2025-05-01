import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import WorkerCard from '../Componets/WorkerCard';
import { FaSearch } from "react-icons/fa";
import Footer from '../Componets/Footer';
import { useLocation } from 'react-router-dom';
import { searchCategoryApi } from '../services/allApi';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function CategorySelect() {

  const token = sessionStorage.getItem("token");
  const [searchTerm, setSearchTerm] = useState('');
  const [unavailableCatogryfield, setunavailableCatogryfield] = useState([])
  const [availableCatogryfield, setavailableCatogryfield] = useState([])
  // Show more states
  const [availableLimit, setAvailableLimit] = useState(8);
  const [unavailableLimit, setUnavailableLimit] = useState(8);
  const [showMessage, setShowMessage] = useState(false);

  const query = useQuery();
  const field = query.get("field");

  useEffect(() => {
    if (field) {
      fileterdCategory(field);
    }
  }, [field, searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  const fileterdCategory = async (field) => {
    if (token) {

      const reqheader = {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`
      }

      console.log(field, "field");

      try {
        const result = await searchCategoryApi(searchTerm ? searchTerm : field, reqheader)
        setavailableCatogryfield(result.data.filteredAvailableUsers)
        setunavailableCatogryfield(result.data.filteredUnavailableUsers)
        setAvailableLimit(4); // Reset limits on new search
        setUnavailableLimit(4);
      } catch (error) {
        console.log(error);

      }

    }


  }


  return (
    <div className="min-h-screen flex flex-col  bg-gray-100 ">
      <Header />

      <div className=" flex-1 ">
        {/* Search Bar */}
        <div className="flex justify-center  pt-10">
          <div className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[6s0%]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search for workers..."
              className="w-full p-3 pl-10 border-2 border-gray-400 rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Worker Lists */}
        <div className="grid px-4 mt-5 max-w-7xl gap-6">
          {/* Available Categories */}
          <div className="p-4 w-full ">
            <h2 className="text-lg font-semibold mb-3">Available</h2>
            <div className="w-full px-4 py-2">
              {availableCatogryfield?.length > 0 ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {availableCatogryfield
                    .slice(0, availableLimit)
                    .map((worker, index) => (
                      <WorkerCard key={index} filterdWorker={worker} />
                    ))}
                </div>
              ) : (
                <div className="text-center my-10 flex items-center justify-center">
                  {showMessage ? (
                    <p className="text-lg text-gray-500">
                    No workers are available at this time. Please check back later.
                  </p>
                  
                  ) : (
                    <span className="loading loading-dots text-gray-400 loading-xl"></span>
                  )}
                </div>
              )}
            </div>


            {/* Show "See More" button only if more workers exist */}
            {availableCatogryfield.length > availableLimit && (
              <p
                className="text-end text-blue-600 cursor-pointer hover:underline mt-2"
                onClick={() => setAvailableLimit(prev => prev + 4)}
              >
                See More
              </p>
            )}
          </div>

          {/* Unavailable Categories */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Unavailable</h2>
            <div className="w-full px-4 py-2">
              {unavailableCatogryfield?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {unavailableCatogryfield.slice(0, unavailableLimit).map((worker, index) => (
                    <WorkerCard key={index} filterdWorker={worker} />
                  ))}
                </div>
              ) : (
                <div className="text-center my-4">
                  {showMessage ? (
                    <p className="text-lg text-gray-500">
                    No workers are available at this time. Please check back later.
                  </p>
                  
                  ) : (
                    <span className="loading loading-dots text-gray-400 loading-xl"></span>
                  )}
                </div>
              )}
            </div>


            {/* Show "See More" button only if more workers exist */}
            {unavailableCatogryfield.length > unavailableLimit && (
              <p
                className="text-end text-red-600 cursor-pointer hover:underline mt-2"
                onClick={() => setUnavailableLimit(prev => prev + 4)}
              >
                See More
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CategorySelect;
