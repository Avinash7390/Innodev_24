import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getEvents,
  deleteEvent,
  updateEvent,
} from "../controllers/Event.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getEvents", getEvents);
router.delete("/deleteEvent/:eventId/:userId", verifyToken, deleteEvent);
router.put("/updateEvent/:eventId/:userId", verifyToken, updateEvent);
export default router;
