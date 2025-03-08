import React, { useState } from 'react';
import Header from '../Componets/Header';
import WorkerCard from '../Componets/WorkerCard';
import { FaSearch } from "react-icons/fa";

function CategorySelect() {
  const allCategories = ["Plumber", "Electrician", "Carpenter", "Painter", "Welder"];

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className=" mx-auto  ">
        {/* Search Bar */}
        <div className="flex justify-center w-full pt-10">
          <div className="relative w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
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


        <div className="grid px-4 max-w-7xl gap-6">
          {/* Available Categories */}
          <div className="  p-4">
            <h2 className="text-lg font-semibold mb-3">Available</h2>
            <div className="space-y-2 grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              <WorkerCard />
              <WorkerCard />
            </div>
          </div>

          {/* Unavailable Categories */}
          <div className=" p-4">
            <h2 className="text-lg font-semibold mb-3">Unavailable</h2>
            <div className="space-y-2 grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
              <WorkerCard />
              <WorkerCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategorySelect;
