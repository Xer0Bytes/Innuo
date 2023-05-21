import express from "express";
import { deleteUser, updateUser, getAllUsers , getCurrentUser} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.post("/update/:id", updateUser);
router.post("/ranking", getAllUsers);
router.post("/getCurrentUser", getCurrentUser);

export default router;