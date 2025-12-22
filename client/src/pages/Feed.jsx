import React, { useEffect, useState } from "react";
import { dummyPostsData, assets } from "../assets/assets";
import Loading from "../components/Loading";
import StoriesBar from "../components/StoriesBar";
import PostCard from "../components/PostCard";
import RecentMessages from "../components/RecentMessages";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeeds = async () => {
    // Simulate loading
    setTimeout(() => {
      setFeeds(dummyPostsData);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">
      <div>
        <StoriesBar />
        <div className="w-full max-w-2xl mx-auto mt-6">
          {feeds.length > 0 ? (
            feeds.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            <p className="text-center text-gray-500 mt-10">No posts yet! 📭</p>
          )}
        </div>
      </div>

      {/*Right Side Bar */}
      <div className="hidden xl:block w-80 space-y-6">
        {/* Sponsored Card */}
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <h3 className="text-gray-900 font-bold mb-3">Sponsored</h3>
          <div className="rounded-lg overflow-hidden mb-3">
            <img
              src={assets.sponsored_img}
              alt="Sponsored"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="font-semibold text-gray-800 text-sm mb-1">
            Email marketing
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Supercharge your marketing with a powerful, easy-to-use platform
            built for results.
          </p>
        </div>

        {/* Recent Messages */}
        <RecentMessages />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Feed;
