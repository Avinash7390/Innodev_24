import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

import { createTicket, updateTicket, deleteTicket } from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/', verifyToken, createTicket);
router.put('/:ticketId', verifyToken, updateTicket);
router.delete('/:ticketId', verifyToken, deleteTicket);

export default router;