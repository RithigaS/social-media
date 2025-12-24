import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Loading from "../components/Loading";
const Layout = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [SidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return <Loading />;
  return isSignedIn ? (
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
