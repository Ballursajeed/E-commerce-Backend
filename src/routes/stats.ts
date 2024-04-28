import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { getBarStats, getDashboardStats, getLineStats, getPieStats } from "../controllers/stats.js";

const app = express.Router();

 app.get("/stats",AdminOnly,getDashboardStats)

 app.get("/pie",AdminOnly,getPieStats);

 app.get("/bar",AdminOnly,getBarStats);

 app.get("/line",AdminOnly,getLineStats);

export default app;