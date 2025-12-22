import React, { useState } from "react";
import UserCard from "../components/UserCard";
import {
  dummyConnectionsData,
  dummyPendingConnectionsData,
} from "../assets/assets";
import { Users, UserPlus } from "lucide-react";

const Connections = () => {
  const [activeTab, setActiveTab] = useState("my-connections");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Network</h1>
        <p className="text-gray-500">
          Manage your connections and pending requests.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("my-connections")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "my-connections"
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>Connections</span>
            <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
              {dummyConnectionsData.length}
            </span>
          </div>
          {activeTab === "my-connections" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("requests")}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${
            activeTab === "requests"
              ? "text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <UserPlus size={18} />
            <span>Requests</span>
            {dummyPendingConnectionsData.length > 0 && (
              <span className="bg-red-50 text-red-600 py-0.5 px-2 rounded-full text-xs">
                {dummyPendingConnectionsData.length}
              </span>
            )}
          </div>
          {activeTab === "requests" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activeTab === "my-connections"
          ? dummyConnectionsData.map((user) => (
              <div key={user._id} className="h-full">
                <UserCard user={user} isConnection={true} />
              </div>
            ))
          : dummyPendingConnectionsData.map((user) => (
              <div key={user._id} className="h-full">
                {/* For requests, we might want different actions, but reusing UserCard for now */}
                <UserCard user={user} isConnection={false} />
              </div>
            ))}
      </div>

      {activeTab === "requests" && dummyPendingConnectionsData.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No pending requests.</p>
        </div>
      )}
    </div>
  );
};

export default Connections;
