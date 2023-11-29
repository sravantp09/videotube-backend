import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js"; // controller

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;