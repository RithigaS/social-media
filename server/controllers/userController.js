import User from "../models/User.js";
import { imagekit } from "../configs/imagekit.js";
import fs from "fs";
import Connection from "../models/Connection.js";

//get user data
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update user data
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { username, bio, location, full_name } = req.body;

    const tempUser = await User.findById(userId);

    if (!tempUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Build update object with only provided values
    const updatedData = {};

    // Handle username
    if (username && username !== tempUser.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.json({ success: false, message: "Username already taken" });
      }
      updatedData.username = username;
    }

    // Only update fields that are provided and not empty
    if (bio !== undefined && bio !== null) updatedData.bio = bio;
    if (location !== undefined && location !== null)
      updatedData.location = location;
    if (full_name !== undefined && full_name !== null)
      updatedData.full_name = full_name;

    // Handle file uploads
    const profile = req.files?.profile?.[0];
    const cover = req.files?.cover?.[0];

    if (profile) {
      try {
        const buffer = fs.readFileSync(profile.path);
        const response = await imagekit.upload({
          file: buffer,
          fileName: profile.originalname,
          folder: "/social-media/profiles",
        });

        const url = imagekit.url({
          path: response.filePath,
          transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "512" },
          ],
        });
        updatedData.profile_picture = url;

        // Delete temp file
        fs.unlinkSync(profile.path);
      } catch (error) {
        console.log("Profile upload error:", error);
      }
    }

    if (cover) {
      try {
        const buffer = fs.readFileSync(cover.path);
        const response = await imagekit.upload({
          file: buffer,
          fileName: cover.originalname,
          folder: "/social-media/covers",
        });

        const url = imagekit.url({
          path: response.filePath,
          transformation: [
            { quality: "auto" },
            { format: "webp" },
            { width: "1280" },
          ],
        });
        updatedData.cover_photo = url;

        // Delete temp file
        fs.unlinkSync(cover.path);
      } catch (error) {
        console.log("Cover upload error:", error);
      }
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.json({ success: true, user, message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//find the user using username, email, location, name
export const discoverUsers = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { input } = req.body;
    const allUsers = await User.find({
      $or: [
        { username: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
      ],
    });

    const filteredUsers = allUsers.filter((user) => user._id !== userId);

    res.json({ success: true, users: filteredUsers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//follow user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    if (user.following.includes(id)) {
      return res.json({
        success: false,
        message: "You are already following this user",
      });
    }
    user.following.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers.push(userId);
    await toUser.save();

    res.json({ success: true, message: "Now you are following the user" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//unfollow user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    user.following = user.following.filter((followingId) => followingId !== id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers = toUser.followers.filter(
      (followerId) => followerId !== userId
    );
    await toUser.save();

    res.json({
      success: true,
      message: "Now you are no longer following this user",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//send connection request

export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;
    //check if user has sent more than 20 requests in the last 24 hrs

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const connectionRequests = await Connection.find({
      from_user_id: userId,
      to_user_id: id,
      createdAt: {
        $gte: last24Hours,
      },
    });
    if (connectionRequests.length >= 20) {
      return res.json({
        success: false,
        message: "You have sent too many requests in the last 24 hours",
      });
    }
    //check if user already connected
    const connection = await Connection.findOne({
      $or: [
        { from_user_id: userId, to_user_id: id },
        { from_user_id: id, to_user_id: userId },
      ],
    });
    if (!connection) {
      await Connection.create({
        from_user_id: userId,
        to_user_id: id,
      });
      return res.json({
        success: true,
        message: "Connection request sent successfully",
      });
    } else if (connection && connection.status === "accepted") {
      return res.json({
        success: false,
        message: "You are already connected",
      });
    }

    return res.json({
      success: false,
      message: "Connection Request Pending",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Get user
export const getConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId).populate(
      "Connections Followers Following"
    );
    const connections = user.connections;
    const followers = user.followers;
    const following = user.following;

    const pendingConnections = (
      await Connection.find({ to_user_id: userId, status: "pending" })
    )
      .populate("from_user_id")
      .map((connection) => connection.from_user_id);
    res.json({
      success: true,
      connections,
      followers,
      following,
      pendingConnections,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//accept the connection request
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;
    const connection = await Connection.findOne({
      from_user_id: id,
      to_user_id: userId,
    });
    if (!connection) {
      return res.json({
        success: false,
        message: "Connection request not found",
      });
    }
    const user = await User.findById(id);
    user.connections.push(id);
    await user.save();
    const toUser = await User.findById(userId);
    toUser.connections.push(userId);
    await toUser.save();
    connection.status = "accepted";
    await connection.save();
    res.json({ success: true, message: "Connection request accepted" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
