import React, { useState } from "react";
import { ArrowLeft, Upload, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { dummyUserData } from "../assets/assets";

const colors = ["#ffffff", "#000000", "#FFD700", "#FF69B4", "#00E5FF"];

const fonts = [
  { name: "Regular", class: "font-normal" },
  { name: "Bold", class: "font-bold" },
  { name: "Italic", class: "italic" },
  { name: "Mono", class: "font-mono" },
];

const bgColors = [
  "#4C6EF5",
  "#7C3AED",
  "#F43F5E",
  "#E11D48",
  "#F59E0B",
  "#10B981",
];

const StoryModal = ({ setShowModal, addStory }) => {
  const [tab, setTab] = useState("text");
  const [background, setBackground] = useState(bgColors[0]);
  const [text, setText] = useState("");
  const [fontColor, setFontColor] = useState("#fff");
  const [fontStyle, setFontStyle] = useState(fonts[0].class);

  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // 📌 MEDIA UPLOAD
  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 📌 POST STORY API CALL
  // 📌 MOCK CREATE STORY (Local Only)
  const handleCreateStory = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStory = {
          _id: `temp_${Date.now()}`,
          user: dummyUserData,
          content: tab === "text" ? text : "",
          media_url: media ? previewUrl : "",
          media_type:
            tab === "text"
              ? "text"
              : media?.type.startsWith("video")
              ? "video"
              : "image",
          background_color: background,
          createdAt: new Date().toISOString(),
        };
        resolve(newStory);
      }, 1000);
    });
  };

  // 📌 TOAST + SAVE
  const handlePostButton = async () => {
    try {
      const newStory = await toast.promise(handleCreateStory(), {
        loading: "Saving...",
        success: <p>Story Added 🎉</p>,
        error: (e) => <p>{e.message}</p>,
      });

      // Update local state immediately
      addStory(newStory);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[999]">
      <div className="w-full max-w-md bg-[#1c1c1c] rounded-2xl shadow-xl p-5">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setShowModal(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <ArrowLeft className="text-white" />
          </button>

          <p className="text-lg font-semibold text-white">Create Story</p>

          {/* POST BUTTON WITH TOAST */}
          <button
            onClick={handlePostButton}
            className="flex items-center gap-2 text-white py-2 px-4 rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer"
          >
            <Sparkles size={18} /> Create Story
          </button>
        </div>

        {/* PREVIEW */}
        <div
          className="w-full h-64 rounded-xl p-4 relative"
          style={{
            background: tab === "text" ? background : "#000",
          }}
        >
          {tab === "text" && (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              style={{
                color: fontColor,
              }}
              className={`w-full h-full bg-transparent resize-none outline-none text-2xl ${fontStyle}`}
            />
          )}

          {tab === "media" &&
            previewUrl &&
            (media.type.startsWith("video") ? (
              <video
                src={previewUrl}
                controls
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              <img
                src={previewUrl}
                className="w-full h-full rounded-xl object-cover"
                alt="preview"
              />
            ))}
        </div>

        {/* TEXT OPTIONS */}
        {tab === "text" && (
          <div className="mt-4 space-y-4">
            {/* BG COLORS */}
            <div className="flex gap-3 justify-center">
              {bgColors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setBackground(c)}
                  style={{ background: c }}
                  className={`w-8 h-8 rounded-full border-2 
                    ${
                      background === c
                        ? "border-white scale-125"
                        : "border-transparent"
                    }
                    transition
                  `}
                />
              ))}
            </div>

            {/* FONT COLOR */}
            <div className="flex gap-3 justify-center">
              {colors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setFontColor(c)}
                  style={{ background: c }}
                  className={`w-7 h-7 rounded-full border 
                    ${
                      fontColor === c
                        ? "border-white scale-125"
                        : "border-gray-300"
                    }
                    transition
                  `}
                />
              ))}
            </div>

            {/* FONT STYLE */}
            <div className="flex justify-center gap-3">
              {fonts.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setFontStyle(f.class)}
                  className={`px-3 py-1 rounded bg-white/10 text-white ${
                    fontStyle === f.class ? "border border-white" : ""
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MEDIA UPLOAD */}
        {tab === "media" && (
          <div className="mt-4">
            <label className="w-full h-40 border-2 border-dashed border-gray-500 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition">
              <Upload className="text-purple-400 mb-2" size={32} />
              <p className="text-gray-300">Upload photo / video</p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* TABS */}
        <div className="flex mt-6 gap-4 justify-center">
          <button
            onClick={() => setTab("text")}
            className={`px-5 py-2 rounded-lg flex-1 ${
              tab === "text"
                ? "bg-white text-black font-semibold"
                : "bg-white/10 text-white"
            }`}
          >
            Text
          </button>

          <button
            onClick={() => setTab("media")}
            className={`px-5 py-2 rounded-lg flex-1 ${
              tab === "media"
                ? "bg-white text-black font-semibold"
                : "bg-white/10 text-white"
            }`}
          >
            Photo/Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;
