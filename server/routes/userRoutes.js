import express from "express";

import {
  getUserData,
  updateUserData,
  discoverUsers,
  followUser,
  unfollowUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";
const userRouter = express.Router();
import {
  getConnectionRequest,
  sendConnectionRequest,
  acceptConnectionRequest,
} from "../controllers/userController.js";

userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
  protect,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUserData
);
userRouter.post("/discover", protect, discoverUsers);
userRouter.post("/follow", protect, followUser);
userRouter.post("/unfollow", protect, unfollowUser);
userRouter.post("/connect", protect, sendConnectionRequest);
userRouter.post("/accept", protect, acceptConnectionRequest);
userRouter.get("/connections", protect, getConnectionRequest);

export default userRouter;
