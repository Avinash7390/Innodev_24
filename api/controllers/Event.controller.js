import { errorHandler } from "../utils/error.js"
import Event from "../models/event.model.js";
export const create = async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create an event'));
    }
   if(!req.body.title || !req.body.content || !req.body.date || !req.body.location || !req.body.tickets.length)
   {
   
    
    return next(errorHandler(400,'Please provide all required fields'))
   }
   const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
   //for seo !

   
const newEvent=new Event( {
    ...req.body,
    slug,
    userId:req.user.id  
    
});
try{
    const savedEvent=await newEvent.save();
    res.status(201).json(savedEvent);

}catch(error){
    
    next(error);
}
};

export const getEvents=async(req,res,next)=>{

    try{
        const startIndex=parseInt(req.query.startIndex)||0;
        const limit=parseInt(req.query.limit)||9;
        const sortDirection=req.query.order==='asc'?1:-1;
        const events=await Event.find(
            {
            ...(req.query.userId&&{userId:req.query.userId}),
         ...(req.query.location&&{location:req.query.location}),
        ...(req.query.slug&&{slug:req.query.slug}),
        ...(req.query.EventId&&{_id:req.query.EventId}),
        ...(req.query.searchTerm&&{
            $or:[
                {title:{$regex:req.query.searchTerm,$options:'i'}},
                {content:{$regex:req.query.searchTerm,$options:'i'}},

            ],
        }),
    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

    const totalEvents=await Event.countDocuments();
    const now=new Date();

    const upcoming=new Date(
        now.getFullYear(),
        now.getMonth()+1,
        now.getDate()
    );
    const upcomingEvents=await Event.countDocuments({
        createdAt:{$gte:upcoming},

    });
    res.status(200).json({
        events
    });

    }catch(error)
    {
next(error);
    }
}

export const deleteEvent=async(req,res,next)=>{
    if(!req.user.isAdmin|| req.user.id !== req.params.userId){
        return next(errorHandler(403,'You are not allowed to delete this Event'));
    }
    try{
        await Event.findByIdAndDelete(req.params.EventId);
        res.status(200).json('The Event has been deleted');
    }catch(error)
    {
        next(error);
    }
}