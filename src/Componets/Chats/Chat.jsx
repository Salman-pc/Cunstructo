// Chat.jsx
import React, { useState } from "react";
import ChatCard from "./ChatCard";
import Chatpanel from "./Chatpanel";
import Header from "../Header";
import { useWindowSize } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";

function Chat() {
    const [selectedChat, setSelectedChat] = useState(null);
    const navigate = useNavigate();
    const { width } = useWindowSize();

    const handleChatSelect = (id) => {
        if (width < 768) {
            navigate('/chatpanel');
        } else {
            setSelectedChat(id);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Header />

            <div className="flex  flex-grow h-full overflow-hidden">
                {/* Chat List - Fixed width for desktop */}
                <div className="w-full z-10 md:w-96 border-r border-gray-200 bg-white h-full flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 p-4 border-b border-gray-300 bg-white">
                        Chats
                    </h2>

                    <div className="flex-grow overflow-y-auto">
                        {[1, 2, 3, 4].map((id) => (
                            <ChatCard key={id} onSelect={() => handleChatSelect(id)} />
                        ))}
                    </div>
                </div>

                {/* Chat Panel - Flexible width */}
                <div className="hidden md:flex flex-1 h-full bg-white">
                    {selectedChat ? (
                        <Chatpanel />
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-gray-50">
                            <p className="text-gray-500 text-lg">
                                Select a chat to start messaging
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chat;