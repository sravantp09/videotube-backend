import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function uploadFileOnCloudinary(filePath) {
  try {
    if (!filePath) return null;
    // upload the file
    const response = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: "auto",
    });
    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath); // removing file from the server if any error happens to prevent malicios activities
    return null;
  }
}

export default uploadFileOnCloudinary;
