import React from "react";
import { useAdd } from "../store/appStore";

function Count() {
  const addData = useAdd((state) => state.addData); // ✅ Ensure Zustand state subscription

  console.log("Rendered Count.jsx with Zustand data:", addData); // ✅ Debugging log

  return (
    <div>
      <h2 className="text-xl font-bold">API Data:</h2>
      {addData.length > 0 ? (
        <ul>
          {addData.map((item, index) => (
            <li key={index}>{item.categoryname}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Count;
