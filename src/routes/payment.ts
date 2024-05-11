import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscounts, createPaymentIntent, deleteCoupon, newCoupon } from "../controllers/payment.js";

const app = express.Router();


 app.post("/create",createPaymentIntent);

 app.post("/coupon/new",AdminOnly,newCoupon);

 app.get("/discount",applyDiscounts);

 app.get("/coupon/all",AdminOnly,allCoupons);

 app.delete("/coupon/:id",AdminOnly,deleteCoupon);

export default app;