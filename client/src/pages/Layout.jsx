import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { X } from "lucide-react";
import { Menu } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
const Layout = () => {
  const user = dummyUserData;
  const [SidebarOpen, setSidebarOpen] = useState(false);
  return user ? (
    <div className="w-full h-screen flex">
      <SideBar sidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 bg-slate-50 ml-0 sm:ml-64 xl:ml-72 transition-all duration-300">
        <Outlet />
      </div>

      {SidebarOpen ? (
        <X
          className="absolute top-3 right-3 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
