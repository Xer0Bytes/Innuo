import express from "express";
import { fetchModule, getExp, updateExp } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/:module_name", fetchModule);
router.post("/exp", getExp);
router.post("/updateExp/:id", updateExp);

export default router;