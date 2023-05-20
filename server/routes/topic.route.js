import express from "express";
import { addTopic } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/contribute", addTopic)

export default router;