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

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export default errorMiddleware;
