import dotenv from "dotenv";
import app from "./app.js";

// LOCAL IMPORTS

import connectDB from "./config/database.js";

dotenv.config({ path: "backend/config/config.env" });

// DB CONNECTION
connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server runnning on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
