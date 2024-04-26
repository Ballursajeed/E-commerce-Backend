import express from "express";
import { AdminOnly } from "../middlewares/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.post("/new", AdminOnly, singleUpload, newProduct);

app.get("/latest", getLatestProducts);

app.get("/all", getAllProducts);//get all products with filter

app.get("/categories", getAllCategories);

app.get("/admin-products",AdminOnly, getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(AdminOnly, singleUpload, updateProduct)
  .delete(AdminOnly, deleteProduct);

export default app;
