import express from "express";
import { getAllAch, areYaWinningSon } from "../controllers/achievement.controller.js";

const router = express.Router();

router.post("/getAllAch", getAllAch);
router.post("/userAchievement/:id", areYaWinningSon);

export default router;