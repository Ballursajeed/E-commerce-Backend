import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { getDashboardStats } from "../controllers/stats.js";

const app = express.Router();

 app.get("/stats",getDashboardStats)

 app.get("/pie",);

 app.get("/bar",);

 app.get("/line",);

export default app;