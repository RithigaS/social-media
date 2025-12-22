import React, { useState, useEffect } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [viewStory, setViewStory] = useState(null);
  const fetchStories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/story");
      if (response.ok) {
        const data = await response.json();
        // Combine API stories with dummy data
        setStories([...data, ...dummyStoriesData]);
      } else {
        // If API fails, just use dummy data
        setStories(dummyStoriesData);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      // If API fails, just use dummy data
      setStories(dummyStoriesData);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-full sm:w-[calc(100vw-260px)] lg:max-w-2xl overflow-x-auto no-scrollbar px-4 py-2">
      <div className="flex gap-4 pb-4">
        {/* CREATE STORY CARD */}
        <div
          onClick={() => setShowModal(true)}
          className="
            min-w-[112px] h-44 rounded-2xl 
            bg-white border border-gray-100
            flex flex-col items-center justify-center cursor-pointer
            relative overflow-hidden group shadow-sm hover:shadow-xl
            transition-all duration-300 transform hover:-translate-y-1
          "
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div
            className="
            relative z-10 w-12 h-12 rounded-full 
            bg-purple-100 text-purple-600 
            flex items-center justify-center 
            group-hover:bg-purple-600 group-hover:text-white group-hover:scale-110 
            transition-all duration-300
          "
          >
            <Plus size={24} />
          </div>
          <p className="relative z-10 text-xs mt-3 text-gray-600 font-semibold group-hover:text-purple-600 transition-colors">
            Create Story
          </p>
        </div>

        {/* STORIES */}
        {stories.map((story, index) => (
          <div
            onClick={() => setViewStory(story)}
            key={index}
            className="
              relative w-[112px] h-44 rounded-2xl overflow-hidden cursor-pointer 
              flex-shrink-0 shadow-md bg-gray-900 border border-white/10
              hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group
            "
          >
            {/* BACKGROUND MEDIA */}
            {story.media_type === "image" ? (
              <>
                <img
                  src={story.media_url}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="story"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              </>
            ) : story.media_type === "video" ? (
              <>
                <video
                  src={story.media_url}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  autoPlay
                  muted
                  loop
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
              </>
            ) : (
              <div
                className="w-full h-full p-3 flex items-center justify-center text-center"
                style={{
                  background:
                    story.background_color ||
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <p className="text-white text-xs font-medium leading-relaxed line-clamp-4 drop-shadow-sm">
                  {story.content}
                </p>
              </div>
            )}

            {/* USER DP & NAME (Top Left) */}
            <div className="absolute top-3 left-3 z-10 flex flex-row items-center gap-2">
              <div className="p-[1.5px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-md">
                <img
                  src={story.user.profile_picture}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  alt={story.user.name}
                />
              </div>
              <p className="text-white text-[10px] font-bold truncate w-20 leading-tight drop-shadow-md shadow-black">
                {story.user.full_name || story.user.username}
              </p>
            </div>

            {/* TIME (Bottom Left) */}
            <p className="absolute bottom-3 left-3 text-white/80 text-[10px] font-medium drop-shadow-md z-10">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        ))}
      </div>
      {/*Add aStory Modal*/}

      {showModal && (
        <StoryModal
          setShowModal={setShowModal}
          fetchStories={fetchStories}
          addStory={(newStory) => setStories([newStory, ...stories])}
        />
      )}

      {/* StoryViewer */}
      {viewStory && (
        <StoryViewer viewStory={viewStory} setViewStory={setViewStory} />
      )}
    </div>
  );
};

export default StoriesBar;
