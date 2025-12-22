import { BadgeCheck, X } from "lucide-react";
import React, { useState, useEffect } from "react";

const StoryViewer = ({ viewStory, setViewStory }) => {
  if (!viewStory) return null;

  const handleClose = () => setViewStory(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timer, progressInterval;
    if (viewStory && viewStory.media_type != "video") {
      setProgress(0);

      const duration = 10000;
      const setTime = 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += setTime;
        setProgress((elapsed / duration) * 100);
      }, setTime);
      //close story after 10 sec

      timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
      };
    }
  }, [viewStory, setViewStory]);
  if (!viewStory) return null;
  const renderContent = () => {
    switch (viewStory.media_type) {
      case "image":
        return (
          <img
            src={viewStory.media_url}
            alt="story"
            className="w-full h-full object-contain rounded-xl"
          />
        );

      case "video":
        return (
          <video
            src={viewStory.media_url}
            className="w-full h-full object-contain rounded-xl"
            controls
            autoPlay
            onEnded={handleClose}
          />
        );

      case "text":
        return (
          <div className="w-full h-full flex items-center justify-center px-6">
            <p className="text-black text-2xl sm:text-3xl font-semibold text-center leading-relaxed ">
              {viewStory.content}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{
        background:
          viewStory.media_type === "text"
            ? viewStory.background_color
            : "rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Progress Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-white/30 rounded-full">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* User Info */}
      <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full">
        <img
          src={viewStory.user?.profile_picture}
          alt="user"
          className="w-8 h-8 rounded-full border border-white"
        />
        <span className="text-white font-medium">{viewStory.user?.name}</span>
        <BadgeCheck size={18} className="text-blue-400" />
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:scale-110 transition"
      >
        <X className="text-white" />
      </button>

      {/* Story Content */}
      <div className="w-full max-w-[90vw] h-[85vh] flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default StoryViewer;
