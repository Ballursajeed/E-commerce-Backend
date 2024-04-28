import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { allCoupons, applyDiscounts, deleteCoupon, newCoupon } from "../controllers/payment.js";

const app = express.Router();

 app.post("/coupon/new",newCoupon);

 app.get("/discount",AdminOnly,applyDiscounts);

 app.get("/coupon/all",AdminOnly,allCoupons);

 app.delete("/coupon/:id",AdminOnly,deleteCoupon);

export default app;