import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadFileOnCloudinary(filePath) {
  try {
    if (!filePath) return null;

    // upload the file
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully", response.url);
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath); // removing file from the server if any error happens to prevent malicios activities
    return null;
  }
}

export default uploadFileOnCloudinary;
