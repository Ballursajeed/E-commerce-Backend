import express from "express";
import { applyDiscounts, newCoupon } from "../controllers/payment.js";
const app = express.Router();
app.post("/coupon/new", newCoupon);
app.get("/discount", applyDiscounts);
export default app;
