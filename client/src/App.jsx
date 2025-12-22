import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import ChatBox from "./pages/ChatBox";
import Connections from "./pages/Connections";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Discover from "./pages/Discover";
import Layout from "./pages/Layout";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useUser();

  return (
    <>
      <Toaster />
      <Routes>
        {/* Authentication Routes */}
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />

        {/* Login or Entire Layout */}
        <Route path="/" element={<Layout />}>
          {/* All pages inside layout */}
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
