import express from "express";


//Importing Routes
import userRoute from "./routes/user.js"
import { userInfo } from "os";
import { connectDB } from "./utils/features.js";

const port = 8001;
connectDB()

const app = express();

app.use(express.json())

app.get("/",(req,res) => {
    res.send("API is Working with /api/v1")
})

//using routes
app.use("/api/v1/user",userRoute);

app.listen(port, ()=>{
    console.log(`Server is Running on http://localhost:${port}`)
})