import express from "express";
import { saveContribution, editContribution, deleteContribution } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/save", saveContribution);
router.post("/edit", editContribution);
router.post("/delete", deleteContribution);

export default router;