import express from "express";
import { register, login, logout, verifyEmail, forgotPassEmail, resetPass } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:id/:unique", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassEmail);
router.get("/password-reset/:id/:unique", resetPass);

export default router;