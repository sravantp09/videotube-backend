import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8002;

// connecting to mongodb
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on Port : ${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed", err.message));
