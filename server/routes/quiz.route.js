import express from "express";
import { fetchModule } from "../controllers/quiz.controller.js";

const router = express.Router();

router.get("/:module_name", fetchModule);

export default router;