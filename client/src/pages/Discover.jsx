import React from "react";
import UserCard from "../components/UserCard";
import { dummyConnectionsData } from "../assets/assets";
import { Search } from "lucide-react";

const Discover = () => {
  // Using dummyConnectionsData as requested to match Connections page content
  const discoverList = dummyConnectionsData;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Discover People
        </h1>
        <p className="text-gray-500">
          Find and connect with people who share your interests.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
          placeholder="Search for people, interests, or locations..."
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {discoverList.map((user) => (
          <div key={user._id} className="h-full">
            <UserCard user={user} isConnection={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
