import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import catchAsyncErrors from "./catchAsyncErrors.js";

// Check user authentication

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access this page", 401));
  }

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedUser.id);

  next();
});

// Handling User Roles

export const AuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
