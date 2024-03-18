import express from "express";

import { getEventUser, getSingleEvent } from "../controllers/eventAttendeesController.js";
const router = express.Router();

router.get("/event-data/:eventId", getEventUser);
router.get("/get-single-event/:eventId", getSingleEvent);
export default router;