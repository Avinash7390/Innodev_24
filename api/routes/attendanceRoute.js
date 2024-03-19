import express from "express";

import {
  getAllattendees,
  markAttendance,
} from "../controllers/attendanceController.js";
const router = express.Router();

router.post("/mark-attendance", markAttendance);
router.get("/get-all-attendees/:eventId", getAllattendees);
export default router;
