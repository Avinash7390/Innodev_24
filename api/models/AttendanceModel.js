import mongoose from "mongoose";


const AttendanceSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.ObjectId,
        ref: "Event",
        required: true,
    },
    registrationNo:{
        type:mongoose.Schema.ObjectId,
        ref:"RegisteredUsers",
        required:true
    }

},)

const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
export default AttendanceModel