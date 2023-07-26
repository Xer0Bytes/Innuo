import express from "express";
import { getAllAch, areYaWinningSon, getExp } from "../controllers/achievement.controller.js";

const router = express.Router();

router.post("/getAllAch", getAllAch);
router.post("/userAchievement/:id", areYaWinningSon);
router.get("/getExp/:id", getExp);

export default router;