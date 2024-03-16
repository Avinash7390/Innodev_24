import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  label: String,
  price: Number,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

export default Ticket;