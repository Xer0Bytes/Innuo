import express from "express";
import { getAllModules } from "../controllers/module.controller.js";
import { sendAdminModule, sendAdminLesson } from "../controllers/module.controller.js";

const router = express.Router();

router.post("/contribute", sendAdminModule);
router.post("/lesson", sendAdminLesson);
router.post("/getModules", getAllModules);

export default router;