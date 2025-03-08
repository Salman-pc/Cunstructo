// Chatpanel.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Chatpanel() {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can I help you?', sender: 'worker', timestamp: '10:00 AM' },
        { id: 2, text: 'I need some plumbing work.', sender: 'user', timestamp: '10:01 AM' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (newMessage.trim() === '') return;
        
        const newMsg = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="flex flex-col w-full h-screen bg-white">
            {/* Chat Header */}
            <div className="bg-blue-600 text-white flex items-center gap-2 p-4 border-b border-blue-700">
                <Link to={'/chats'}><i class="fa-solid fa-arrow-left"></i></Link>
                <h2 className="font-semibold text-lg">Chat with Plumber</h2>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 pb-24 overflow-y-auto px-6 space-y-4">
                {messages.map(msg => (
                    <div 
                        key={msg.id} 
                        className={`flex flex-col max-w-[55%] md:px-10 md:max-w-[45%] ${
                            msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
                        }`}
                    >
                        <div
                            className={`p-3 rounded-lg ${
                                msg.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-800 rounded-bl-none'
                            } shadow-sm`}
                        >
                            <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-gray-500 text-right' : 'text-gray-400'
                        }`}>
                            {msg.timestamp}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Responsive Message Input */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200">
                <div className="p-4 max-w-screen-xl md:max-w-screen-xl mx-auto  lg:max-w-[calc(100%-20rem)]">
                    <div className="flex items-center gap-2">
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
                            <FaPaperPlane className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatpanel;