import express from "express";
import { addModule } from "../controllers/module.controller.js";

const router = express.Router();

router.post("/contribute", addModule)

export default router;