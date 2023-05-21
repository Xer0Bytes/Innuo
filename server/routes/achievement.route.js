import express from "express";
import { getAllAch } from "../controllers/achievement.controller.js";

const router = express.Router();

router.post("/getAllAch", getAllAch)

export default router;