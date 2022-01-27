import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);

export default router;
