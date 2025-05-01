import React, { useEffect, useState } from "react";
import {  Unlock } from "lucide-react";
import { getAllblockedUsersApi, updateBlockApi } from "../../services/allApi";
import { toast } from "react-toastify";

function BlockedList() {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedWorkers, setBlockedWorkers] = useState([]);

  const [showAllUsers, setShowAllUsers] = useState(false);
  const [showAllWorkers, setShowAllWorkers] = useState(false);

  useEffect(() => {
    getAllblockedUsers()
    getAllblockedWorkers()
  }, [])

  const getAllblockedUsers=async()=>{
    try {
      const result = await getAllblockedUsersApi({roll:"user"})
      setBlockedUsers(result.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const getAllblockedWorkers=async()=>{
    
    try {
      const result = await getAllblockedUsersApi({roll:"worker"})
      setBlockedWorkers(result.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  

  const handleUnblockUser =async (id) => {
    
    try {
      const result = await updateBlockApi(id,{block:false})
      if(result.status==200){
        toast.success("unblocked")
        getAllblockedUsers()
      }
    } catch (error) {
      console.log(error);
      
    }
  };



  const handleUnblockWorker = async(id) => {
    try {
      const result = await updateBlockApi(id,{block:false})
      if(result.status==200){
        getAllblockedWorkers()
        toast.success("unblocked")
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="bg-white rounded-2xl md:pt-40 pt-24 w-full max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold md:mt-3 text-gray-800 mb-4">Blocked Users</h2>
      {blockedUsers.length > 0 ? (
        <>
          <ul className="space-y-4 max-h-96 overflow-auto px-8">
            {(showAllUsers ? blockedUsers : blockedUsers.slice(0, 3)).map((user) => (
              <li
                key={user.id}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <p className="font-medium text-left text-gray-800">{user.username}</p>
                  <p className="font-medium text-left text-gray-800">{user.email}</p>
                  {/* <p className="text-gray-500 text-xs">Blocked on: {user.date}</p> */}
                </div>
                <button
                  onClick={() => handleUnblockUser(user._id)}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  <Unlock size={18} />
                </button>
              </li>
            ))}
          </ul>
          {blockedUsers.length > 3 && (
            <button
              onClick={() => setShowAllUsers(!showAllUsers)}
              className="mt-2 text-blue-500 hover:underline"
            >
              {showAllUsers ? "See Less" : "See More"}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-600 text-center">No blocked users.</p>
      )}

      <h2 className="text-xl font-semibold text-gray-800 mt-24 mb-4">Blocked Workers</h2>
      {blockedWorkers.length > 0 ? (
        <>
          <ul className="space-y-4 max-h-96 overflow-auto px-8">
            {(showAllWorkers ? blockedWorkers : blockedWorkers.slice(0, 3)).map((worker,index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
              >
                <div>
                  <p className="font-medium text-left text-gray-800">{worker.username}</p>
                  <p className="font-medium text-left text-gray-800">{worker.email}</p>
                  {/* <p className="text-gray-500 text-xs">Blocked on: {worker.date}</p> */}
                </div>
                <button
                  onClick={() => handleUnblockWorker(worker._id)}
                  className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                >
                  <Unlock size={18} />
                </button>
              </li>
            ))}
          </ul>
          {blockedWorkers.length > 3 && (
            <button
              onClick={() => setShowAllWorkers(!showAllWorkers)}
              className="mt-2 text-blue-500 hover:underline"
            >
              {showAllWorkers ? "See Less" : "See More"}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-600 text-center">No blocked workers.</p>
      )}
    </div>
  );
}

export default BlockedList;
