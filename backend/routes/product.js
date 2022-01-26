import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.post("/admin/product/new", isAuthenticated, addProduct);
router.put("/admin/product/:id", isAuthenticated, updateProduct);
router.delete("/admin/product/:id", isAuthenticated, deleteProduct);

export default router;
