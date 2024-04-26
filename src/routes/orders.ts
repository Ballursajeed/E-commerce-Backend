import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { newOrder } from "../controllers/order.js";

const app = express.Router();

// route - /api/v1/user/new
 app.post("/new",newOrder)


export default app;