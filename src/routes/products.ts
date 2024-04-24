import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { getLatestProducts, newProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new",AdminOnly,singleUpload,newProduct);

app.get("/latest",getLatestProducts);

export default app;