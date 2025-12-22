import React from "react";
import { MapPin, Calendar, Edit2, BadgeCheck } from "lucide-react";
import moment from "moment";

/**
 * UserProfileInfo Component
 * Displays the specific user's detailed profile header.
 *
 * @param {Object} user - The user object containing profile details.
 * @param {Array} posts - Array of user's posts to calculate stats.
 * @param {Function} setShowEdit - Function to toggle the edit profile modal.
 */
const UserProfileInfo = ({ user, posts, setShowEdit }) => {
  if (!user) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* COVER PHOTO SECTION */}
      {/* Dynamic cover photo or fallback color */}
      <div className="h-48 md:h-64 relative bg-gray-200">
        {user.cover_photo ? (
          <img
            src={user.cover_photo}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500" />
        )}
      </div>

      {/* COMPONENT BODY */}
      <div className="px-6 pb-6 relative">
        {/* PROFILE PICTURE & EDIT BUTTON */}
        <div className="flex justify-between items-end -mt-16 md:-mt-20 mb-6">
          {/* Profile Picture with border */}
          <div className="relative">
            <img
              src={user.profile_picture || "https://via.placeholder.com/150"}
              alt={user.full_name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-md object-cover bg-white"
            />
          </div>

          {/* Edit Profile Button */}
          {setShowEdit && (
            <button
              onClick={() => setShowEdit(true)}
              className="mb-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Edit2 size={16} />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* USER DETAILS SECTION */}
        <div className="mb-6">
          {/* Name and Verification Badge */}
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.full_name}
            </h1>
            {user.is_verified && (
              <BadgeCheck className="text-blue-500 fill-blue-50" size={24} />
            )}
          </div>

          {/* Username */}
          <p className="text-gray-500 font-medium mb-4">@{user.username}</p>

          {/* Bio */}
          {user.bio && (
            <p className="text-gray-700 max-w-2xl mb-4 whitespace-pre-wrap leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Metadata (Location & Date Joined) */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            {user.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>Joined {moment(user.createdAt).format("MMMM YYYY")}</span>
            </div>
          </div>

          {/* User Stats Row */}
          <div className="flex items-center gap-8 border-t border-gray-100 pt-6">
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-bold text-gray-900 text-lg">
                {posts ? posts.length : 0}
              </span>
              <span className="text-gray-500 text-sm">Posts</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-bold text-gray-900 text-lg">
                {user.followers ? user.followers.length : 0}
              </span>
              <span className="text-gray-500 text-sm">Followers</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-bold text-gray-900 text-lg">
                {user.following ? user.following.length : 0}
              </span>
              <span className="text-gray-500 text-sm">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
