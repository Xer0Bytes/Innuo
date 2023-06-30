import express from "express";
import { getAllModules } from "../controllers/module.controller.js";
import { sendAdmin } from "../controllers/topic.controller.js";

const router = express.Router();

router.post("/contribute", sendAdmin);
router.post("/lesson", sendAdmin);
router.post("/getModules", getAllModules);

export default router;