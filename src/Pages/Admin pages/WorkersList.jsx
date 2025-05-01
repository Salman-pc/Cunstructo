import React, { useEffect, useState } from "react";
import { Trash2, Ban } from "lucide-react";
import { deleteUserApi, getAllworkerApi, updateBlockApi } from "../../services/allApi";
import serverUrl from "../../services/serverUrl";
import profileimg from "../../assets/profileimg/profileimg.webp"
import { toast } from "react-toastify";

function WorkersList() {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    getAllworkers()
  }, [])

  const getAllworkers = async () => {
    try {
      const result = await getAllworkerApi()
      setWorkers(result.data)
    } catch (error) {
      console.log(error);

    }
  }


  const handleDeleteWorker =async (id) => {
    try {
      const result=await deleteUserApi(id)

      if(result.status>=200&&result.status<=299){
        toast.warning("removed worker!!")
        getAllworkers()

       }
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleBlockWorker =async (id) => {
    try {
      const result = await updateBlockApi(id,{block:true})
      if(result.status==200){
        toast.warning("temparory blocked")
        getAllworkers()
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="bg-white rounded-2xl md:pt-40 pt-24 w-full max-w-7xl mx-auto">
      <h2 className="text-2xl md:mt-3 font-semibold text-gray-800  mb-4">Workers List</h2>
      {workers.length > 0 ? 
        <ul className="space-y-4 p-4 mt-8 ">
          {workers.map((worker) => (
            <li
              key={worker.id}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg "
            >
              <div className="flex items-center space-x-3">
                <img src={worker.profilepic?`${serverUrl}/uploads/${worker.profilepic}`:profileimg} alt={worker.username} 
                className={worker.profilepic?"w-12 h-12 bg-gray-200 rounded-full":"w-12 h-12 bg-gray-200 p-2 rounded-full"} />
                <div>
                  <p className="font-medium text-left text-gray-800">{worker.email}</p>
                  <p className="text-gray-600 text-left text-sm">{worker.skills}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBlockWorker(worker._id)}
                  className={`p-2 rounded-lg text-white transition-all ${worker.blocked ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"}`}
                >
                  <Ban size={18} />
                </button>
                <button
                  onClick={() => handleDeleteWorker(worker._id)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
       : (
        <p className="text-gray-600 text-center">No workers found.</p>
      )}
    </div>
  );
}

export default WorkersList;
