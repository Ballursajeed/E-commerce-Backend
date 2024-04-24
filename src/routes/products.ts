import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new",AdminOnly,singleUpload,newProduct);

app.get("/latest",getLatestProducts);

app.get("/categories",getAllCategories);

app.get("/admin-products",getAdminProducts);

app.route("/:id").get(getSingleProduct).put(updateProduct).delete(deleteProduct)



export default app;