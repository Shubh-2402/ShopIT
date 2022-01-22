import dotenv from "dotenv";
import app from "./app.js";

// LOCAL IMPORTS

import connectDB from "./config/database.js";

dotenv.config({ path: "backend/config/config.env" });

// DB CONNECTION
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled Promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
