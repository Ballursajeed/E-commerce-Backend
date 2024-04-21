import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect("mongodb+srv://sajeedballur:3BkcoecCgWPgdiou@cluster0.i4gylc9.mongodb.net/", { dbName: "ecommerce" })
  .then(() => console.log("MongoDB connected!!!"))
  .catch((error) => console.error("MongoDB connection error:", error));;
};
 //"mongodb+srv://sajeedballur:3BkcoecCgWPgdiou@cluster0.i4gylc9.mongodb.net/"