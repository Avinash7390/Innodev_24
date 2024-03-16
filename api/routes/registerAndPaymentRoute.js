import express from "express";
import {
  registerAndMakePaymentController,
  registerForEventController,
  getRegisteredUser,
} from "../controllers/registrationAndPaymentController.js";

const router = express.Router();

router.post(
  "/register-and-make-payment-session",
  registerAndMakePaymentController
);
router.post("/register-new-user", registerForEventController);
router.get("/get-registered-user/:eventId/:userId", getRegisteredUser);
export default router;
