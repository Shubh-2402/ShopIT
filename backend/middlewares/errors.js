import ErrorHandler from "../utils/errorHandler.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV.trim() === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV.trim() === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //Handling Wrong Mongoose ObjectId Error

    if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling Mongoose Validation Error

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //Handle Mongoose Duplicate key error

    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyvalue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handle Wrong JWT Error

    if (err.name === "JsonWebTokenError") {
      const message = "JSON Web token is invalid. Please try again!!";
      error = new ErrorHandler(message, 400);
    }

    //Handling expire JWT Error

    if (err.name === "TokenExpiredError") {
      const message = `JSON Web token is expired . Please try again!!`;
      error = new ErrorHandler(message, 400);
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default errorMiddleware;
