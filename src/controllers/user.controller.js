import User from "../models/user.model.js";
import uploadFileOnCloudinary from "../utils/cloudinary.js";

export async function registerUser(req, res) {
  try {
    // get user details from frontend / postman
    const { username, email, fullName, password } = req.body;

    // validating user details
    if (!(username && email && fullName && password)) {
      return res
        .status(400)
        .json({ status: "failed", message: "all fields are required" });
    }

    if (email && !email.includes("@")) {
      throw new Error("invalid email address");
    }

    if (password && password.length < 8) {
      throw new Error("password must contain atleast 8 characters");
    }
    // check if user already exists : username and email
    const existingUser = await User.findOne({ $or: [{ email }, { username }] }); // checking db for user with matching email or username

    if (existingUser) {
      return res
        .status(409) // 409 - conflicting resource
        .json({
          status: "error",
          message: "user with email or username already exists",
        });
    }

    const avatarLocalPath = req.files?.["avatar"]?.[0]?.["path"];
    const coverImageLocalPath = req.files?.["coverImage"]?.[0]?.["path"];

    if (!avatarLocalPath) {
      throw new Error("Avatar file is required");
    }

    // upload images to cloudinary
    const avatarPath = await uploadFileOnCloudinary(avatarLocalPath);
    let coverImagePath = "";
    if (coverImageLocalPath) {
      coverImagePath = await uploadFileOnCloudinary(coverImageLocalPath);
    }

    if (!avatarPath) {
      throw new Error("Failed to upload avatar file");
    }

    // creating new user in the db
    const userData = await User.create({
      username: username.toLowerCase(),
      email,
      fullName,
      avatar: avatarPath.url,
      coverImage: coverImagePath?.url || "",
      password,
    });

    if (!userData._id) {
      throw new Error("error happened during data store");
    }

    // removing password and refreshToken from the userData result before sending to client
    userData.password = undefined;
    userData.refreshToken = undefined;

    return res.status(201).json({
      status: "success",
      message: "user registered successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    return res.status(200).json({ status: "success", message: "ok" });
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}
