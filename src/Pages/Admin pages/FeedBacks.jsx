import React, { useEffect, useState } from "react";
import { Trash2, CheckCircle } from "lucide-react";
import { deletefeedbackApi, getAllfeedbackApi } from "../../services/allApi";
import { toast } from "react-toastify";

function FeedBacks() {
    const [feedbacks, setFeedbacks] = useState({});

    useEffect(() => {
      getAllFeedback()
    }, [])
    
    const getAllFeedback=async()=>{
        const result = await getAllfeedbackApi()
        setFeedbacks(result.data)   
    }

    const handleDeleteFeedback =async (id) => {
        
        try {
            const result = await deletefeedbackApi(id)
            if(result.status==200){
                getAllFeedback()
                toast.warning("removed user feed back")
            }
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <div className=" rounded-2xl min-h-screen md:pt-40 pt-24 w-full max-w-7xl mx-auto">
            <h2 className="text-2xl md:mt-3 font-semibold text-gray-800  mb-4">User Feedbacks</h2>
            {feedbacks.length>0?
                <ul className="space-y-4  mt-8 p-4 px-8 overflow-auto">
                   
                       {feedbacks.map((feedback,index)=>(
                        <div key={index} className="">
                            <li
                               
                                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{feedback?.username}</p>
                                    
                                </div>
    
                                <div className="w-4/6 overflow-hidden">
    
                                    <p className="text-gray-600 text-sm break-words">{feedback?.message}</p>
    
                                </div>
                                <div className="flex space-x-2">
                                    {/* <button
                                        onClick={() => handleResolveFeedback()}
                                        className={`p-2 rounded-lg text-white transition-all ${""? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                                    >
                                        <CheckCircle size={18} />
                                    </button> */}
                                    <button
                                        onClick={() => handleDeleteFeedback(feedback._id)}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                
                            </li>
                            <p className="text-gray-500 text-xs mt-1 text-right">{feedback.date}</p>
                        </div>))}
                  
                </ul>
             : (
                <p className="text-gray-600 text-center">No feedback available.</p>
            )}
            
        </div>
    );
}

export default FeedBacks;
