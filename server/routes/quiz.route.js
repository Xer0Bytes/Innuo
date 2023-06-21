import express from "express";
import { fetchModule, getExp, updateExpAndCompModules } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/:module_id", fetchModule);
router.post("/exp", getExp);
router.post("/updateExp/:id", updateExpAndCompModules);

export default router;