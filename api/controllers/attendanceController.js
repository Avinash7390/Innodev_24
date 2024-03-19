import AttendanceModel from "../models/AttendanceModel.js";
import { registerUser as Register } from "../models/registeredUserModel.js";
import mongoose from "mongoose";

const markAttendance = async (req, res, next) => {
  const { registrationNo, eventId } = req.body;
  if (!mongoose.isValidObjectId(registrationNo)) {
    return res.status(200).json({
      ok: false,
      message: "Invalid ID Type",
    });
  }

  const verifyRegistration = await Register.findOne({
    _id: registrationNo,
    eventId: eventId,
  });

  if (!verifyRegistration) {
    return res.status(200).json({
      ok: false,
      message: "Invalid Registration No",
    });
  }

  if (verifyRegistration) {
    const mark = await AttendanceModel.findOne({
      registrationNo: registrationNo,
      eventId: eventId,
    });
    if (mark) {
      return res.status(200).json({
        ok: false,
        message: "Already Checked In",
      });
    } else {
      const response = await AttendanceModel.create({
        registrationNo,
        eventId,
      });
      res.status(200).json({
        ok: true,
        message: "Checked In Successfully!",
        response,
      });
    }
  }
};

const getAllattendees = async (req, res, next) => {
  const { eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      ok: false,
      message: "Please Provide eventId",
    });
  }

  const users = await AttendanceModel.find({ eventId });
  res.status(200).json({
    ok: true,
    users,
  });
};
export { markAttendance, getAllattendees };
