import Ticket from "../models/ticket.model.js";



export const createTicket = async (req, res) => {
  const { label, price, eventId } = req.body;
  const ticket = new Ticket({ label, price, eventId });
  await ticket.save();
  res.status(201).json(ticket);
};

export const updateTicket = async (req, res) => {
  const { label, price } = req.body;
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) return res.status(404).send('Ticket not found');
  ticket.label = label;
  ticket.price = price;
  await ticket.save();
  res.status(200).json(ticket);
};

export const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) return res.status(404).send('Ticket not found');
  await ticket.remove();
  res.status(200).send('Ticket deleted');
};