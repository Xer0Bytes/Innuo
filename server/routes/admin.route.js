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
router.get("/edit/:id", editContribution);
router.get("/reject/:id", rejectContribution);
router.post("/delete", deleteAllPastRequests);
router.post("/getAllCons", getAllContributions);

export default router;
