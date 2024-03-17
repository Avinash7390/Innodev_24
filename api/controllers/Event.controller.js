import { errorHandler } from "../utils/error.js"
import Event from "../models/event.model.js";
import Ticket from "../models/ticket.model.js";


export const create = async(req,res,next)=>{
    try{
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create an event'));
    }
    

   if(!req.body.title || !req.body.content || !req.body.date || !req.body.location)
   {
   

    return next(errorHandler(400,'Please provide all fields'))
   }

if(!req.body.tickets.length){
    return next(errorHandler(404,'Tickets are required for an Event'))

}


   const existingEvent = await Event.findOne({ title: req.body.title });
        if (existingEvent) {
            return next(errorHandler(400, 'Event Name already taken'));  
        }
   const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
   //for seo !

   const tickets = await Ticket.insertMany(req.body.tickets);
    const ticketIds = tickets.map(ticket => ticket._id);
console.log(req.body.tickets);

const newEvent=new Event( {
    ...req.body,
    slug,
    userId:req.user.id ,
    tickets: ticketIds, 
    
});

    const savedEvent=await newEvent.save();
   return res.status(201).json(savedEvent);
console.log(savedEvent);
}catch(error){
   
    
    next(error);
}
};

export const getEvents=async(req,res,next)=>{

    try{
        const startIndex=parseInt(req.query.startIndex)||0;
        const limit=parseInt(req.query.limit)||9;
        const sortDirection=req.query.order==='asc'?1:-1;
        const event=await Event.find(
            {
            ...(req.query.userId&&{userId:req.query.userId}),
         ...(req.query.location&&{location:req.query.location}),
         ...(req.query.date&&{date:req.query.date}),
         ...(req.query.time&&{time:req.query.time}),
         
        ...(req.query.slug&&{slug:req.query.slug}),
        ...(req.query.eventId&&{_id:req.query.eventId}),
        ...(req.query.searchTerm&&{
            $or:[ 
                {title:{$regex:req.query.searchTerm,$options:'i'}},
                {content:{$regex:req.query.searchTerm,$options:'i'}},

            ],
        }),
    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit).populate('tickets');

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
        event,upcomingEvents,totalEvents
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
        await Event.findByIdAndDelete(req.params.eventId);
        res.status(200).json('The Event has been deleted');
    }catch(error)
    {
        next(error);
    }
}

export const updateEvent = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this Event'));
    }
    if (!req.body.title || !req.body.content || !req.body.date || !req.body.location) {
      return next(errorHandler(400, 'Please provide all fields'))
    }
    if(!req.body.tickets.length){
        return next(errorHandler(404,'Tickets are required for an Event'))
    
    }
  
    try {
      // Check if the title is being updated
      const event = await Event.findById(req.params.eventId);
      if (event.title !== req.body.title) {
        // Check if the new title already exists
        const existingEvent = await Event.findOne({ title: req.body.title });
        if (existingEvent) {
          return next(errorHandler(400, 'Event name already taken'));
        }
      }
  
      const ticketIds = [];
      for (const ticketData of req.body.tickets) {
        let ticket;
        if (ticketData._id) {
          
          ticket = await Ticket.findByIdAndUpdate(ticketData._id, ticketData, { new: true });
        } else {
        
          ticket = await Ticket.create(ticketData);
        }
        ticketIds.push(ticket._id);
      }
  


      const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, {
        $set: {
          location: req.body.location,
          date: req.body.date,
          time: req.body.time,
          title: req.body.title,
          content: req.body.content,
          slug: req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, ''),
          tickets: ticketIds,
          image: req.body.image,
        }
      }, { new: true });
      res.status(200).json(updatedEvent);
    } catch (error) {
      next(error);
    }
  }