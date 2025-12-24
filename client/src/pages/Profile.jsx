import React, { useState } from "react";
import UserProfileInfo from "../components/UserProfileInfo";
import PostCard from "../components/PostCard";
import ProfileModal from "../components/ProfileModal";
import { dummyPostsData } from "../assets/assets";
import { useUser } from "@clerk/clerk-react";
import Loading from "../components/Loading";

/**
 * Profile Page Component
 * Displays the full profile page including the header info, tabs, and content (posts).
 */
const Profile = () => {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  if (!isLoaded) return <Loading />;
  if (!user) return null;

  // Map Clerk user to internal format
  const userData = {
    _id: user.id,
    full_name: user.fullName,
    username:
      user.username || user.primaryEmailAddress?.emailAddress.split("@")[0],
    email: user.primaryEmailAddress?.emailAddress,
    profile_picture: user.imageUrl,
    bio: user.publicMetadata?.bio || "hey there i am using Friend Up",
    location: user.publicMetadata?.location || "",
    is_verified: true,
    followers: user.publicMetadata?.followers || [],
    following: user.publicMetadata?.following || [],
  };

  // Filter posts belonging to this user
  const myPosts = dummyPostsData.filter(
    (post) =>
      post.user._id === user.id ||
      post.user._id === "user_2zdFoZib5lNr614LgkONdD8WG32" // Allowing dummy posts for now
  );

  // Extract media items from posts
  const mediaItems = myPosts.flatMap((post) => {
    // Return images if they exist
    if (post.image_urls && post.image_urls.length > 0) {
      return post.image_urls.map((url) => ({
        _id: post._id,
        url: url,
        type: "image",
      }));
    }
    return [];
  });

  const handleSaveProfile = (updatedData) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setShowEdit(false);
  };

  return (
    <div
      key="profile-page-force-render"
      className="max-w-4xl mx-auto p-4 md:p-6"
    >
      {/* PROFILE HEADER COMPONENT */}
      <UserProfileInfo
        user={userData}
        posts={myPosts}
        setShowEdit={setShowEdit}
      />

      {/* NAVIGATION TABS */}
      <div className="flex items-center justify-center gap-2 mb-6 bg-white p-1 rounded-xl shadow-sm border border-gray-100 w-full md:w-fit mx-auto">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 md:flex-none px-8 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "posts"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab("media")}
          className={`flex-1 md:flex-none px-8 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "media"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Media
        </button>
        <button
          onClick={() => setActiveTab("likes")}
          className={`flex-1 md:flex-none px-8 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === "likes"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Likes
        </button>
      </div>

      {/* TAB CONTENT AREA */}
      <div className="space-y-6">
        {activeTab === "posts" && (
          <div className="flex flex-col gap-4">
            {myPosts.length > 0 ? (
              myPosts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">No posts yet.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "media" && (
          <div>
            {mediaItems.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mediaItems.map((item, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-100 group cursor-pointer relative"
                  >
                    <img
                      src={item.url}
                      alt="User media"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">No media to display.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "likes" && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500">No liked posts yet.</p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <ProfileModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        currentUser={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
