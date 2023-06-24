import express from "express";
import { register, login, logout, verifyEmail, redirection } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.get("/verify/:id/:unique", verifyEmail)
router.get("/verified", redirection)
router.post("/login", login);
router.post("/logout", logout)

export default router;