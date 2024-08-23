import express from "express";
import { check } from "express-validator";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Validation rules
const orderValidationRules = [
  check("name").isString().notEmpty(),
  check("address").isString().notEmpty(),
  check("paymentInfo").isString().notEmpty(),
  check("items").isArray().withMessage("Items must be an array"),
  check("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a positive number"),
];

// Routes
router.post("/", orderValidationRules, createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", orderValidationRules, updateOrder);
router.delete("/:id", deleteOrder);

export default router;
