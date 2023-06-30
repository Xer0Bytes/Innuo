import express from "express";
import { getAllTopics, sendAdmin } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/contribute", sendAdmin)
router.post("/getTopics", getAllTopics)

export default router;