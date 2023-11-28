import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export default async function connectDB() {
  try {
    const status = await mongoose.connect(
      `${process.env.DB_CONNECTION_URL}/${DB_NAME}`,
    );
    console.log(`\nMongoDB connected! DB HOST: ${status.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection faied :", error.message);
    process.exit(1); // exiting app
  }
}
