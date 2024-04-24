import express from "express";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
//Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
const port = 8001;
connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API is Working with /api/v1");
});
//using routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
});
