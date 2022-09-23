import express from "express";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { AuthorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/order/new", isAuthenticated, newOrder);
router.get("/order/:id", isAuthenticated, getSingleOrder);
router.get("/orders/me", isAuthenticated, myOrders);
router.get(
  "/admin/orders",
  isAuthenticated,
  AuthorizeRoles("admin"),
  allOrders
);
router.put(
  "/admin/order/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  updateOrder
);
router.delete(
  "/admin/order/:id",
  isAuthenticated,
  AuthorizeRoles("admin"),
  deleteOrder
);

export default router;
