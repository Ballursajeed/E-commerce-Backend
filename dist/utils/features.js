import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
export const connectDB = (mongoURI) => {
    mongoose
        .connect(mongoURI, { dbName: "ecommerce" })
        .then(() => console.log("MongoDB connected!!!"))
        .catch((error) => console.error("MongoDB connection error:", error));
};
//"mongodb+srv://sajeedballur:3BkcoecCgWPgdiou@cluster0.i4gylc9.mongodb.net/"
export const invalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
            "latest-products",
            "catogories",
            "all-products",
        ];
        const products = await Product.find({}).select("_id");
        products.forEach((i) => {
            productKeys.push(`product-${i._id}`);
        });
        myCache.del(productKeys);
    }
    if (order) {
    }
    if (admin) {
    }
};
