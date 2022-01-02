import express from "express";
import { getAllProducts } from "../controllers/productController.js";
const router = express.Router();

router.get("/product/all",getAllProducts)

export default router;