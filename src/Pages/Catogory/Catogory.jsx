import React from "react";
import CatCard from "../../Componets/CatCard";

function Category() {

   
    return (
        <div className="max-w-7xl mx-auto mt-6 p-6 bg-white rounded-lg ">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
                
            </div>

            {/* Choose Text */}
            <p className="text-gray-600 text-xl font-medium mb-4">Choose a category:</p>

            {/* Category Cards */}
            <div >
                <CatCard  />
            </div>
        </div>
    );
}

export default Category;
