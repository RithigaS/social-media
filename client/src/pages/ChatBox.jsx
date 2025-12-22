import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  dummyConnectionsData,
  dummyMessagesData,
  dummyUserData,
} from "../assets/assets";
import { ArrowLeft, Send, Image, MoreVertical } from "lucide-react";
import moment from "moment";

const ChatBox = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef();

  // Find the user we are chatting with
  const otherUser =
    dummyConnectionsData.find((u) => u._id === userId) || dummyUserData;

  // Filter messages between current user and selected user
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Load initial messages (using dummy data for simulation)
    // In a real app, this would be an API call
    const conversation = dummyMessagesData.filter(
      (msg) =>
        (msg.from_user_id === dummyUserData._id && msg.to_user_id === userId) ||
        (msg.from_user_id === userId && msg.to_user_id === dummyUserData._id)
    );
    // If no messages found in dummy data, show some defaults or empty
    setMessages(
      conversation.length > 0 ? conversation : dummyMessagesData.slice(0, 4)
    );
  }, [userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      _id: Date.now().toString(),
      from_user_id: dummyUserData._id,
      to_user_id: userId,
      text: newMessage,
      message_type: "text",
      createdAt: new Date().toISOString(),
      seen: false,
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/messages")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors md:hidden"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>

          <div className="relative">
            <img
              src={otherUser.profile_picture}
              alt={otherUser.full_name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              {otherUser.full_name}
            </h3>
            <p className="text-xs text-green-600 font-medium">Online</p>
          </div>
        </div>

        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 space-y-6">
        {messages.map((msg, index) => {
          const isOwn = msg.from_user_id === dummyUserData._id;
          return (
            <div
              ref={index === messages.length - 1 ? scrollRef : null}
              key={msg._id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex flex-col max-w-[75%] md:max-w-[60%] ${
                  isOwn ? "items-end" : "items-start"
                }`}
              >
                {/* Media Content */}
                {msg.message_type === "image" && (
                  <div className="mb-1 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={msg.media_url}
                      alt="Shared content"
                      className="max-w-xs md:max-w-sm w-full h-auto"
                    />
                  </div>
                )}

                {/* Text Content */}
                {msg.text && (
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                                            ${
                                              isOwn
                                                ? "bg-indigo-600 text-white rounded-tr-none"
                                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
                                            }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Timestamp */}
                <span
                  className={`text-[10px] mt-1 px-1 font-medium ${
                    isOwn ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  {moment(msg.createdAt).format("h:mm A")}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-100 sticky bottom-0">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          >
            <Image size={22} />
          </button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 text-gray-800 placeholder-gray-500 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all border border-transparent focus:border-indigo-200"
          />

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2.5 rounded-full transition-all duration-200 ${
              newMessage.trim()
                ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
