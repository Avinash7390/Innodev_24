import { registerUser as Register } from "../models/registeredUserModel.js";
import User from "../models/user.model.js";
import Event from "../models/event.model.js";
import Stripe from "stripe";


const stripe = new Stripe(
  "sk_test_51Oufb1SIR9oMWB8aBQzwT62Dh2Rs2H1zprguDiH6XqhC8SY4S8kJ7hXEj2yZsACzOTqjkhAFoeIFFHx0Ne6dj0PE00v7yeOno3"
);

import { errorHandler } from "../utils/error.js";

const registerAndMakePaymentController = async (req, res, next) => {
  const { eventId, userId, amount } = req.body;
  if (!eventId) {
    return next(errorHandler(400, "Please Provide eventId"));
  }
  if (!userId) {
    return next(errorHandler(400, "Please Provide UserId"));
  }
  if(!amount){
    return next(errorHandler(400, "Please Select Ticket"));
  }
  const event = await Event.findById(eventId);
  const price = amount;
  const qt = 1;
  const lineItem = [
    {
      price_data: {
        currency: "USD",
        product_data: {
          name: event.title,
        },
        unit_amount: Math.round(price * 100),
      },
      quantity: qt,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: lineItem,
    mode: "payment",
    success_url: `http://localhost:5173/payment-success/${event._id}/${userId}/${amount}`,
    cancel_url: `http://localhost:5173/paymentCancel/${event._id}${userId}`,
  });

  res.status(200).json({
    message: "Successfully Posted!",
    sessionID: session.id,
  });
};

const registerForEventController = async (req, res, next) => {
  const { eventId, userId , amount} = req.body;
  if (!eventId) {
    return next(errorHandler(400, "Please Provide eventId"));
  }
  if (!userId) {
    return next(errorHandler(400, "Please Provide UserId"));
  }

  if(!amount){
    return next(errorHandler(400, "Please Select An Amount"));
  }

  const prevUser = await Register.findOne({ eventId, userId });
  if (prevUser) {
    return res.status(200).json({
      message: "User is already registered for the event!!",
      userData: prevUser,
      ok: true,
    });
  }
  const registeredUser = await Register.create({
    eventId,
    userId,
    amount
  });

  res.status(200).json({
    message: "User has successfully registered for the event!!",
    userData: registeredUser,
    ok: true,
  });
};

const getRegisteredUser = async (req, res, next) => {
  // const { eventId, userId } = req.params;
  const eventId = req.params.eventId;
  const userId = req.params.userId;
  if (!eventId) {
    return next(errorHandler(400, "Please Provide eventId"));
  }
  if (!userId) {
    return next(errorHandler(400, "Please Provide UserId"));
  }

  const user = await Register.findOne({ eventId, userId });
  if (user) {
    res.status(200).json({
      ok: true,
      userData: user,
      message: "User fetched Successfully!",
    });
  } else {
    res.status(200).json({
      ok: false,
    });
  }
};

export {
  registerAndMakePaymentController,
  registerForEventController,
  getRegisteredUser,
};
