import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/user.js";
import sendToken from "../utils/jwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "samples/people/smiling-man",
      url: "https://res.cloudinary.com/shubham2402/image/upload/v1633580504/samples/people/smiling-man.jpg",
    },
  });

  sendToken(user, 200, res);
});

export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User --> /api/v1/logout

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//Forgot Password --> /api/v1/password/forgot

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("No user found with this email", 404));
  }

  // Get Reset Token

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Generate reset URL

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your reset password token is - \n\n${resetURL}\n\n If you have not request this email ,then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} to reset password`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
