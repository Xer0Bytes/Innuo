import express from "express";
import { addModule, getAllModules } from "../controllers/module.controller.js";

const router = express.Router();

router.post("/contribute", addModule);
router.post("/getModules", getAllModules);

export default router;