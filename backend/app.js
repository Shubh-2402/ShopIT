import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errors.js";
import productRoute from "./routes/product.js";
import authRoute from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

// API ROUTES
app.use("/api/v1", productRoute);
app.use("/api/v1", authRoute);

// Middleware to handle errors
app.use(errorMiddleware);

export default app;
