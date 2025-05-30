import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { reciverIdContext, selectedChattoUserContext } from '../../Context/OtherPurpuseContextApi';
import { getmessageApi, sendmessageApi } from '../../services/allApi';
import profileimg from '../../assets/profileimg/profileimg.webp';
import serverUrl from '../../services/serverUrl';
import { displayUserOnlineOrOflineContext } from '../../Context/SocketioContext';


function Chatpanel() {

    const navigate = useNavigate()
    const messagesEndRef = useRef(null);
    const { onlineusersResponse, isonlineworker, setonlineworker, messages, setMessages } = useContext(displayUserOnlineOrOflineContext)
    const { reciveridResponse } = useContext(reciverIdContext);
    const { setselectduserResponse } = useContext(selectedChattoUserContext)
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const toReciverData = JSON.parse(localStorage.getItem("toReciverData"));
    const reciverid = reciveridResponse || localStorage.getItem("reciverid");


    const [newMessage, setNewMessage] = useState('');


    // Setup socket connection ONCE
    useEffect(() => {
        if (reciverid && onlineusersResponse.length > 0) {
            setonlineworker(onlineusersResponse.includes(reciverid));
        }
    }, [reciverid, onlineusersResponse]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (token && reciverid) {
            if (reciveridResponse) {
                localStorage.setItem("reciverid", reciveridResponse);
            }
            getAllmessage();
        }
    }, [token, reciverid]);

    const getAllmessage = async () => {
        const reqheader = {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        };

        try {
            const result = await getmessageApi(reciverid, reqheader);
            setMessages(result.data);

        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async () => {
        if (token && newMessage.trim() !== '') {
            try {
                const reqheader = {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                };

                const newMsg = { text: newMessage ,  senderId: user._id };

                const result = await sendmessageApi(reciverid, newMsg, reqheader);
                if (result.status === 200) {
                    setMessages([...messages, newMsg]);
                    setNewMessage('');
                    getAllmessage(); // Optionally optimize later
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const hanidileclose = () => {
        navigate("/chats")
        setselectduserResponse("")
    }

    return (
        <div className="flex flex-col w-full  h-screen bg-gray-200">
            {/* Chat Header */}
            <div className="bg-[#1877F2] text-white z-50 fixed w-full md:static flex items-center justify-between p-2 px-5 border-b border-blue-700">
                <div className='flex items-center gap-3'>
                    <Link className='md:hidden' to={'/chats'}><i className="fa-solid fa-arrow-left"></i></Link>
                    <div>
                        <img className={toReciverData?.profilepic ? 'w-11 h-11 shadow-md rounded-full' : 'w-11 p-2 bg-white h-11 shadow-md rounded-full'} src={toReciverData?.profilepic ? `${serverUrl}/uploads/${toReciverData.profilepic}` : profileimg} alt="" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-md">{toReciverData?.username}</h2>
                        <span className='text-xs'>{isonlineworker ? "Online" : "Offline"}</span>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <i onClick={hanidileclose}
                        className="fa-solid fa-xmark text-2xl cursor-pointer"></i>
                </div>
            </div>

            {/* Chat Messages */}
            <div style={{ scrollbarWidth: 'none' }} className="flex-1 p-4 md:mt-0 mt-12 pb-24 overflow-y-auto scr px-6 space-y-4">
                {messages?.map((msg, index) => (
                    <div key={index} className={`flex chat flex-col lg:px-10 ${msg?.senderId === user?._id ? 'chat-end' : 'chat-start'}`}>
                        <p className={`text-sm chat-bubble break-words whitespace-pre-wrap ${msg?.senderId === user?._id ? 'bg-[#236f1d]' : 'bg-[#363b3a83]'}`}>{msg.text}</p>
                        <span className={`text-xs mt-1 ${msg?.senderId === user?._id ? 'text-gray-500 text-right' : 'text-gray-400'}`}>
                            {new Date(msg?.createdAt).toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200">
                <div className="p-4 max-w-screen-xl md:max-w-screen-xl mx-auto lg:max-w-[calc(100%-20rem)]">
                    <div className="flex  w-fullitems-center gap-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            aria-label="Type your message"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                            disabled={!newMessage.trim()}
                        >
                            <FaPaperPlane className="w-5 h-5 " />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatpanel;
