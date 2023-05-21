import express from "express";
import { fetchModule, getExp } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/:module_name", fetchModule);
router.post("/exp", getExp);

export default router;