import express from "express";
import { sendAdminQuestion } from "../controllers/question.controller.js";

const router = express.Router();

router.post("/addQuestions", sendAdminQuestion)

export default router;