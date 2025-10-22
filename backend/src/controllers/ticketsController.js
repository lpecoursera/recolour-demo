import { tickets } from '../data/mockData.js'
import { ResponseService } from '../services/responseService.js'
import { ACTIONS } from '../models/actions.js'

export function listTickets(req, res) {
    ResponseService.multiResponse(req, res, tickets);
}

export function getTicket(req, res) {
    const id = req.params.id;
    const t = tickets.find(x => x.id === id);
    if (ResponseService.ifNotExistResponse(res, t)) return;
    if (ResponseService.ifNotAllowedResponse(req, res, t, "View")) return;
    ResponseService.singleResponse(req, res, t);
}

export function createTicket(req, res) {
    // TODO: Check if CreateTicket is allowed
    const { photoIds, guide, note, priority, partner } = req.body;
    const newTicket = {
        id: 'Ticket-' + Date.now().toString(36),
        type: 'ticket',
        status: 'Draft',
        photoIds: photoIds,
        guide: guide,
        note: note,
        priority: priority,
        partner: partner
    };
    tickets.push(newTicket);

    // Response
    ResponseService.singleResponse(req, res, newTicket);
    ResponseService.singleEmit(req, newTicket, 'ticket:create', 'ticket:remove');
}

export function updateTicket(req, res) {
    const { id } = req.params;
    const ticket = tickets.find(t => t.id === id);

    if (ResponseService.ifNotExistResponse(res, t)) return;
    if (ResponseService.ifNotAllowedResponse(req, res, t, "Edit")) return;

    const { photoIds, guide, note, priority, partner } = req.body;
    ticket.photoIds = photoIds || ticket.photoIds;
    ticket.guide = guide || ticket.guide;
    ticket.note = note || ticket.note;
    ticket.priority = priority || ticket.priority;
    ticket.partner = partner || ticket.partner;

    ResponseService.singleResponse(req, res, ticket);
    ResponseService.singleEmit(req, ticket, 'ticket:update', 'ticket:remove');
}

export function applyAction(req, res) {
    const id = req.params.id;
    const { actionKey, payload } = req.body;

    const t = tickets.find(x => x.id === id);

    if (ResponseService.ifNotExistResponse(res, t)) return;
    if (ResponseService.ifNotAllowedResponse(req, res, t, actionKey)) return;

    const nextStatus = ACTIONS[actionKey]?.nextStatus;
    if (!nextStatus) {
        return res.status(400).json({ error: 'Unknown or unhandled action' })
    }

    switch (actionKey) {
        case ACTIONS.SendTicketToPartner.key:
            if (payload && payload.partnerId) t.partnerId = payload.partnerId;
            if (!t.partnerId) return res.status(400).json({ error: 'No partner specified' })
            t.status = nextStatus;
            break
        case ACTIONS.SetTicketComplete.key:
            t.status = nextStatus;
            break
        case ACTIONS.ApproveTicket.key:
            t.status = nextStatus;
            t.approvedDate = Date();
            t.approverId = req.user.id;
            break
        case ACTIONS.RejectTicket.key:
            t.status = nextStatus;
            if (payload && payload.rejectComment) t.rejectComment = payload.rejectComment;
            t.rejectedDate = Date();
            t.rejecterId = req.user.name;
            break
        default:
            t.status = nextStatus;
    }
    ResponseService.singleResponse(req, res, t);
    ResponseService.singleEmit(req, t, 'ticket:update', "ticket:remove");
}
