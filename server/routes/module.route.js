import express from "express";
import { addModule, getAllModules, addLesson } from "../controllers/module.controller.js";

const router = express.Router();

router.post("/contribute", addModule);
router.post("/lesson", addLesson);
router.post("/getModules", getAllModules);

export default router;