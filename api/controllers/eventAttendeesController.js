import { registerUser as Register} from "../models/registeredUserModel.js";
import Event from "../models/event.model.js";


const getEventUser = async(req, res, next) => {
    const {eventId} = req.params;

    if(!eventId){
        if (!eventId) {
            return next(errorHandler(400, "Please Provide eventId"));
        }
    }
    const eventData = await Register.find({eventId}).populate("userId");
    const singleEvent = await Event.find({_id:eventId});
    if(!eventData){
        return res.status(400).json({
            ok:false,
            message:"Some error in data"
        })
    }
    

    res.status(200).json({
        ok:true,
        eventData,
        singleEvent,
        message:"EventData fetched SuccessFully!"
    })
}

const getSingleEvent = async(req, res, next) => {
    const {eventId} = req.params;

    if(!eventId){
        return res.status(400).json({
            ok:false,
            message:"Please Provide eventId"
        })
    }

    const singleEvent = await Event.find({_id:eventId});
    if(!singleEvent){
        return res.status(400).json({
            ok:false,
            message:"Some error in data"
        })
    }
    res.status(200).json({
        ok:true,
        singleEvent,
        message:"Single Event Fetched Successfully!"
    })
}

export {getEventUser, getSingleEvent}