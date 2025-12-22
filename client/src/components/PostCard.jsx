import React, { useState } from "react";
import { BadgeCheck, Heart, MessageSquare, Share2 } from "lucide-react";
import moment from "moment";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-shadow duration-300">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.user.profile_picture}
          alt={post.user.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h3 className="font-bold text-gray-900 text-sm">
              {post.user.full_name}
            </h3>
            {post.user.is_verified && (
              <BadgeCheck size={14} className="text-blue-500 fill-blue-50" />
            )}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      {post.content && (
        <p className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
          {post.content.split(" ").map((word, i) =>
            word.startsWith("#") ? (
              <span
                key={i}
                className="text-indigo-600 font-medium cursor-pointer hover:underline"
              >
                {word}{" "}
              </span>
            ) : (
              word + " "
            )
          )}
        </p>
      )}

      {/* MEDIA (Image/Video) */}
      {post.image_urls && post.image_urls.length > 0 && (
        <div className="rounded-xl overflow-hidden mb-3 border border-gray-100">
          <img
            src={post.image_urls[0]}
            alt="post media"
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="flex items-center gap-6 pt-2 border-t border-gray-50 mt-2">
        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="flex items-center gap-2 group"
        >
          <Heart
            size={20}
            className={`transition-colors duration-300 ${
              liked
                ? "fill-red-500 text-red-500"
                : "text-gray-500 group-hover:text-red-500"
            }`}
          />
          <span className="text-sm text-gray-500 font-medium group-hover:text-red-500">
            {post.likes_count?.length || 0}
          </span>
        </button>

        {/* Comment */}
        <button className="flex items-center gap-2 group">
          <MessageSquare
            size={20}
            className="text-gray-500 group-hover:text-blue-500 transition-colors"
          />
          <span className="text-sm text-gray-500 font-medium group-hover:text-blue-500">
            {post.comments_count || 12}
          </span>
        </button>

        {/* Share */}
        <button className="flex items-center gap-2 group">
          <Share2
            size={20}
            className="text-gray-500 group-hover:text-green-500 transition-colors"
          />
          <span className="text-sm text-gray-500 font-medium group-hover:text-green-500">
            7
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
