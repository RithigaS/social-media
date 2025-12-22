import React from "react";
import { UserPlus, MessageCircle, MapPin, Users } from "lucide-react";

/**
 * UserCard Component
 * Displays user profile information in a card format.
 * Used in Discover and Connections pages.
 *
 * @param {Object} user - The user data object to display
 * @param {boolean} isConnection - Whether the user is already connected
 */
const UserCard = ({ user, isConnection = false }) => {
  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      {/* Cover Photo */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        {user.cover_photo && (
          <img
            src={user.cover_photo}
            alt="cover"
            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 flex flex-col flex-grow relative">
        {/* Avatar */}
        <div className="flex justify-center -mt-10 mb-3">
          <img
            src={user.profile_picture || "https://via.placeholder.com/150"}
            alt={user.full_name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-sm object-cover bg-white"
          />
        </div>

        {/* User Details */}
        <div className="text-center mb-4 flex-grow">
          <h3 className="font-bold text-gray-900 text-lg mb-1">
            {user.full_name}
          </h3>
          <p className="text-sm text-gray-500 font-medium mb-3">
            @{user.username}
          </p>

          {user.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3 px-2">
              {user.bio}
            </p>
          )}

          <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mb-4">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{user.followers?.length || 0} followers</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          {isConnection ? (
            <>
              <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">
                <MessageCircle size={16} />
                Message
              </button>
            </>
          ) : (
            <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
              <UserPlus size={16} />
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
