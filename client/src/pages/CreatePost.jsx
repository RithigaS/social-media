import React, { useState, useRef } from "react";
import { dummyUserData } from "../assets/assets";
import { Image, X } from "lucide-react";
import { toast } from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Create local preview URLs for the selected images
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!content.trim() && selectedImages.length === 0) {
      toast.error("Please add some text or images!");
      return;
    }

    // Here you would normally send the data to a backend
    console.log("Posting:", { content, images: selectedImages });

    // Show success message
    toast.success("Post created successfully!");

    // Reset form
    setContent("");
    setSelectedImages([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Post</h1>
        <p className="text-gray-500">Share your thoughts with the world</p>
      </div>

      {/* Create Post Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={dummyUserData.profile_picture}
            alt={dummyUserData.full_name}
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-bold text-gray-900 text-sm">
              {dummyUserData.full_name}
            </h3>
            <p className="text-xs text-gray-500">@{dummyUserData.username}</p>
          </div>
        </div>

        {/* Text Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full min-h-[120px] resize-none border-none focus:ring-0 text-gray-700 text-lg placeholder-gray-400 p-0 mb-4"
        />

        {/* Image Previews */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
            {selectedImages.map((img, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden aspect-square border border-gray-100"
              >
                <img
                  src={img.preview}
                  alt={`preview ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
          {/* Media Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleImageClick}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
              title="Add Image"
            >
              <Image size={24} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>

          {/* Publish Button */}
          <button
            onClick={handlePublish}
            disabled={!content.trim() && selectedImages.length === 0}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              !content.trim() && selectedImages.length === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
            }`}
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
