import express from "express";
import {
  registerAndMakePaymentController,
  registerForEventController,
} from "../controllers/registrationAndPaymentController.js";

const router = express.Router();

router.post(
  "/register-and-make-payment-session",
  registerAndMakePaymentController
);
router.post("/register-new-user", registerForEventController);
export default router;
