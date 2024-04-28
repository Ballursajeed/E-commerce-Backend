import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { newCoupon } from "../controllers/payment.js";

const app = express.Router();

// route - /api/v1/user/new
 app.post("/coupon/new",newCoupon)

export default app;