import express from "express";

const port = 8001;
const app = express();

app.listen(port, ()=>{
    console.log(`Server is Running on http://localhost:${port}`)
})