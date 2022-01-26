import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
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

export default router;
