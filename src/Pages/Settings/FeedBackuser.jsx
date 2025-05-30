import React, { useState, useEffect } from "react";
import { sendFeedbackApi } from "../../services/allApi";
import { toast } from "react-toastify";

function FeedBackuser() {
  const token = localStorage.getItem("token");

  const [feedback, setFeedback] = useState({message:"",date:""});
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newDate = new Date()
    let dates = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const formattedDate = `${dates}-${month}-${year}`;

    const reqheader = {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    }
    setFeedback({ ...feedback, date: formattedDate });

    const {date,message}=feedback

    const dataToSend = {
      message: feedback.message,
      date: formattedDate
    };

    if (date,message) {
      
      try {
        const result = await sendFeedbackApi(dataToSend, reqheader)
        if (result.status >= 200 && result.status <= 299) {
          setSubmitted(true);
          setFeedback({message: "", date: "" });
        }
        else{
          toast.warning("try again")
        }
      } catch (error) {
        console.log(error);

      }

    }
  };

 
  return (
    <div className="max-w-2xl mx-auto ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 md:mt-0 mt-6">Send Your Feedback</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full h-42 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your feedback here..."
            value={feedback.message}
            onChange={(e) => setFeedback({message:e.target.value})}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit Feedback
          </button>
        </form>
      ) : (
        <p className="text-green-600 text-center font-medium">Thank you for your feedback!</p>
      )}
    </div>
  );
}

export default FeedBackuser;
