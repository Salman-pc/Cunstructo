// Chat.jsx
import React, { useContext, useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import Chatpanel from "./Chatpanel";
import Header from "../../Componets/Header";
import { useWindowSize } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { getuserforsidebarApi, getusersandworkersforsidebarApi } from "../../services/allApi";
import { reciverIdContext, selectedChattoUserContext } from "../../Context/OtherPurpuseContextApi";
import { FaComment, FaCommentMedical, FaMale } from "react-icons/fa";


function Chat() {

    const { selectduserResponse, setselectduserResponse } = useContext(selectedChattoUserContext)
    const { setreciveridResponse } = useContext(reciverIdContext)
    const user = JSON.parse(sessionStorage.getItem("user"))
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate();
    const { width } = useWindowSize();

    const [chatWorkers, setChatworkers] = useState([])

    useEffect(() => {
        getAllworkesforSidebar()
    }, [])

    const getAllworkesforSidebar = async () => {
        try {

            if (token) {
                const reqheader = {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                }
                if (user.roll == "user") {
                    const result = await getuserforsidebarApi(reqheader)
                    setChatworkers(result.data)

                } else {
                    const result = await getusersandworkersforsidebarApi(reqheader)
                    setChatworkers(result.data)

                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChatSelect = (worker) => {
        if (width < 768) {
            setreciveridResponse(worker._id)
            sessionStorage.setItem("toReciverData", JSON.stringify(worker))
            navigate('/chatpanel');

        } else {
            sessionStorage.setItem("toReciverData", JSON.stringify(worker))
            setreciveridResponse(worker._id);
            setselectduserResponse(worker._id)

        }
    };


    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex  flex-grow h-full w-[100%] ">
                {/* Chat List - Fixed width for desktop */}
                <div className="w-full z-10 md:w-96 border-r border-gray-200 bg-white h-full flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-300 bg-white">
                        Chats
                    </h2>

                    <div
                        style={{ scrollbarWidth: 'thin' }}
                        className={`flex-grow md:h-[80vh] overflow-y-auto ${chatWorkers?.length === 0 ? 'flex justify-center rotate-90 items-center' : ''
                            }`}
                    >
                        {chatWorkers.length > 0 ? <div>
                            {chatWorkers?.map((workers, key) => (
                                <ChatCard key={key} workers={workers} onSelect={() => handleChatSelect(workers)} />
                            ))}
                        </div> : <span className="loading loading-bars text-gray-400 loading-xl"></span>}
                    </div>
                </div>

                {/* Chat Panel - Flexible width */}
                <div className="hidden md:flex flex-1 w-62 h-full bg-white ">
                    {selectduserResponse ? (
                        <Chatpanel />
                    ) : (
                        <div className="flex-1 flex items-center w-full justify-center bg-gray-50">
                            <div className="text-center">
                                {/* Chat Icons with Animation */}
                                <div className="flex gap-6 justify-center mb-4">
                                    <FaComment className="text-9xl text-blue-200 scale-x-[-1] animate-pulse" />
                                    <FaComment className="text-9xl text-blue-300 animate-bounce delay-200" />
                                </div>

                                {/* Message Text */}
                                <p className="text-gray-500 text-lg font-medium">
                                    Select a chat to start messaging
                                </p>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;