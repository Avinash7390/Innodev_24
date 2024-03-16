import mongoose from 'mongoose';



const eventSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
   
  },
  time: {
    type: String,
    required: true,

  },
  location: {
    type: String,
    required: true,
  },
  tickets: [{
    name: String,
    price: Number,
  }],
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1638132704795-6bb223151bf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  content: {
    type: String,
    required: true,
  },
  slug:{
    type:String,
    required:true,
    unique:true,
},

},
{ timestamps: true });
const Event=mongoose.model('Event',eventSchema);
export default Event;