import express from "express";
import { register, login, logout, verifyEmail} from "../controllers/auth.controller.js";
import { forgotPassEmail, resetPass, verifyEmailReset} from "../controllers/forgot.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:id/:unique", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassEmail);
router.get("/verify-reset/:id/:unique", verifyEmailReset);
router.post("/password-reset/:id", resetPass);

export default router;
