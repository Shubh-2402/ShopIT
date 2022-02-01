import {
  getAllUsers,
  forgotPassword,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  getUserDetails,
  updateUser,
  delteUser,
} from "../controllers/authController.js";
import express from "express";
import { AuthorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.post("/password/reset/:token", resetPassword);
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile/update", isAuthenticated, updateProfile);
router.put("/password/update", isAuthenticated, updatePassword);
router.get(
  "/admin/users",
  isAuthenticated,
  AuthorizeRoles("admin"),
  getAllUsers
);
router.get(
  "/admin/user/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  getUserDetails
);
router.put(
  "/admin/user/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  updateUser
);
router.delete(
  "/admin/user/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  delteUser
);

export default router;
