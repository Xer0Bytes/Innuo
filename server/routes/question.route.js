import express from "express";
import { sendAdmin } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/addQuestions", sendAdmin)

export default router;