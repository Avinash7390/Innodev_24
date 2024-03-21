import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  test,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/getusers", verifyToken, getUsers);
export default router;
