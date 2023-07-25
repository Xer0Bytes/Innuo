import express from "express";
import {
  deleteUser,
  updateUser,
  getAllUsers,
  getCurrentUser,
  getConNotifs,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/delete/:id", deleteUser);
router.post("/update/:id", updateUser);
router.post("/ranking", getAllUsers);
router.post("/getCurrentUser", getCurrentUser);
router.post("/conNotifs/:id", getConNotifs);

export default router;
