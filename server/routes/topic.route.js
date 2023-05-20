import express from "express";
import { addTopic, getAllTopics } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/contribute", addTopic)
router.post("/getTopics", getAllTopics)

export default router;