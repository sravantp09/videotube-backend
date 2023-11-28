import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8002;
const app = express();

// connecting to mongodb
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
