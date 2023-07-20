import express from "express";
import {
  approveContribution,
  editContribution,
  rejectContribution,
  getAllContributions,
  deleteAllPastRequests,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/approve/:id", approveContribution);
router.post("/edit", editContribution);
router.post("/reject", rejectContribution);
router.post("/delete", deleteAllPastRequests);
router.post("/getAllCons", getAllContributions);

export default router;
