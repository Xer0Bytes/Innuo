import express from "express";
import {
  approveContribution,
  editContribution,
  rejectContribution,
  getAllContributions,
  deleteAllPastRequests,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/approve/:id", approveContribution);
//router.post("/edit/:id", editContribution);
router.post("/reject/:id", rejectContribution);
router.post("/delete", deleteAllPastRequests);
router.post("/getAllCons", getAllContributions);

export default router;
