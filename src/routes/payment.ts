import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscounts, deleteCoupon, newCoupon } from "../controllers/payment.js";

const app = express.Router();

 app.post("/coupon/new",newCoupon);

 app.get("/discount",applyDiscounts);

 app.get("/coupon/all",allCoupons);

 app.delete("/coupon/:id",deleteCoupon);




export default app;