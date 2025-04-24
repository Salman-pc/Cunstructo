import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import profieimg from "../assets/profileimg/profileimg.webp"
import serverUrl from "../services/serverUrl";
import { reciverIdContext, selectedChattoUserContext  } from "../Context/OtherPurpuseContextApi";
import { useWindowSize } from "@uidotdev/usehooks";

function WorkerCard({ filterdWorker }) {

  const navigate = useNavigate()
  const { width } = useWindowSize();
  const {setreciveridResponse}=useContext(reciverIdContext)
  const {setselectduserResponse}=useContext(selectedChattoUserContext)

  const handileChattoworker=(id)=>{
    setreciveridResponse(id)
    sessionStorage.setItem("reciverid", id);

    if (width < 768) {
      setreciveridResponse(filterdWorker._id)
      sessionStorage.setItem("toReciverData", JSON.stringify(filterdWorker))
      navigate('/chatpanel');


  } else {
      sessionStorage.setItem("toReciverData", JSON.stringify(filterdWorker))
      setreciveridResponse(filterdWorker._id);
      navigate('/chats');
      setselectduserResponse(filterdWorker._id)

  }
  }

  return (
    <div onClick={()=>handileChattoworker(filterdWorker._id)} className="p-3 bg-white shadow-md mt-1 rounded-lg flex items-center gap-2 sm:w-[90%] h-24">
      <img
        src={filterdWorker?.profilepic? `${serverUrl}/uploads/${filterdWorker?.profilepic}`: profieimg}
        alt={filterdWorker?.username}
        className={
          filterdWorker?.profilepic
            ? "w-12 h-12 border rounded-full object-cover": "p-1 w-12 h-12 border rounded-full object-cover"
            
        }
      />
      <div className="flex-1">
        <h3 className="text-gray-800 font-semibold truncate">{filterdWorker?.username}</h3>
        <p className="text-sm text-gray-600">Experience:{filterdWorker?.
          experience == "" ? 0 : filterdWorker?.experience}</p>
        <p className="text-sm text-yellow-500">⭐ 5</p>
      </div>
    </div>
  );
}

export default WorkerCard;