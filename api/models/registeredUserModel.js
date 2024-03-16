import mongoose from "mongoose";
const registerUserSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      default: 100,
    },
    ticketCount: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const registerUser = mongoose.model("RegisteredUsers", registerUserSchema);
export { registerUser };
