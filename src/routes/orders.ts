import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { allOrders, myOrders, newOrder } from "../controllers/order.js";

const app = express.Router();

// route - /api/v1/user/new
 app.post("/new",newOrder);

 app.get("/my",myOrders)
 
 app.get("/all",AdminOnly,allOrders)

export default app;