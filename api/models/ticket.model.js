import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;