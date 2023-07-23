import express from "express";
import { getAllTopics, sendAdminTopic } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/contribute", sendAdminTopic)
router.post("/getTopics", getAllTopics)

export default router;