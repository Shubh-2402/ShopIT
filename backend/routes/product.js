import express from "express";
import {
  addProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProductReviews,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { AuthorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.post(
  "/admin/product/new",
  isAuthenticated,
  AuthorizeRoles("admin"),
  addProduct
);
router.put(
  "/admin/product/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  deleteProduct
);

router.put("/review", isAuthenticated, createProductReview);

router.get("/reviews", isAuthenticated, getProductReviews);

router.delete("/reviews", isAuthenticated, deleteReview);

export default router;
