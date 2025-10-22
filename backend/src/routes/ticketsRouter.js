import express from 'express'
import { listTickets, getTicket, updateTicket, createTicket, applyAction } from '../controllers/ticketsController.js'

const router = express.Router();

router.get('/', listTickets);
router.get('/:id', getTicket);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.put('/:id/actions', applyAction);

export default router;