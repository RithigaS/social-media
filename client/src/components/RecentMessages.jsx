import React from "react";
import { dummyConnectionsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Eye } from "lucide-react";

const RecentMessages = () => {
  const navigate = useNavigate();

  const handleMessageClick = (userId) => {
    navigate(`/messages/${userId}`);
  };

  return (
    <div className="flex flex-col gap-4">
      {dummyConnectionsData.map((user) => (
        <div
          key={user._id}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:shadow-md transition-all duration-200 group"
        >
          {/* Avatar */}
          <div className="shrink-0">
            <img
              src={user.profile_picture}
              alt={user.full_name}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 leading-tight">
              {user.full_name}
            </h3>
            <p className="text-sm text-gray-500 mb-1">@{user.username}</p>
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Actions */}
          <div className="align-self-start sm:self-center flex flex-row gap-2 mt-2 sm:mt-0">
            <button
              onClick={() => handleMessageClick(user._id)}
              className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
              title="Message"
            >
              <MessageSquare size={18} />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
              title="View Profile"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentMessages;
