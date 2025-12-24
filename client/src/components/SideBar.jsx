import React from "react";
import { assets } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";
import MenuItems from "./MenuItems";
import { CirclePlus, LogOut } from "lucide-react";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";

const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  return (
    <div
      className={`
        w-64 xl:w-72 h-full fixed max-sm:absolute top-0 left-0 z-40
        bg-white/30 backdrop-blur-2xl
        border-r border-purple-300/40
        shadow-[0_0_25px_rgba(168,85,247,0.25)]
        rounded-r-3xl flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"}
      `}
    >
      {/* ================= TOP SECTION =============== */}
      <div className="px-6 pt-8">
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="logo"
            className="w-36 cursor-pointer hover:scale-110 transition-all duration-300"
          />
        </div>

        {/* Divider */}
        <div className="border-t border-purple-400/30 mb-8"></div>

        {/* Menu Items */}
        <MenuItems setSidebarOpen={setSidebarOpen} />

        {/* Create Post Button */}
        <Link
          to="/create-post"
          className="
            flex items-center justify-center gap-2 py-3 mt-10 mx-auto rounded-xl
            bg-linear-to-r from-purple-600 to-indigo-600
            text-white font-semibold shadow-lg w-full
            hover:shadow-[0_0_15px_rgba(147,51,234,0.8)]
            hover:scale-[1.03] transition-all duration-200
          "
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* ================= BOTTOM USER SECTION =============== */}
      <div
        className="
          w-full px-5 py-5 mt-4
          border-t border-purple-300/30
          flex items-center justify-between
        "
      >
        {/* User Info */}
        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonPopoverCard: "shadow-xl",
                userButtonPopoverActionButton: "hover:bg-purple-50",
              },
            }}
          />
          <div>
            <h1 className="font-semibold text-lg text-purple-700">
              {user?.fullName || "User"}
            </h1>
            <p className="text-sm text-purple-500">
              @
              {user?.username ||
                user?.primaryEmailAddress?.emailAddress.split("@")[0]}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <LogOut
          className="w-6 h-6 text-purple-700 cursor-pointer hover:text-purple-900 transition-all"
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
};

export default SideBar;
