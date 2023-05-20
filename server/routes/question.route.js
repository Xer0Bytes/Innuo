import express from "express";
import { addQuestions } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/addQuestions", addQuestions)

export default router;