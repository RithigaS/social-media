import React from "react";
import RecentMessages from "../components/RecentMessages";

const Messages = () => {
  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-500 mt-1">Talk to your friends and family</p>
        </div>
        <RecentMessages />
      </div>
    </div>
  );
};

export default Messages;
