import { ACTIONS } from '../models/actions.js'
import { STATUSES } from '../models/statuses.js'

const ticketActions = {
    administrator: [
        { action: ACTIONS.View.key },
        { action: ACTIONS.Edit.key },
        { action: ACTIONS.Delete.key },
        { action: ACTIONS.SetTicketToReady.key },
        { action: ACTIONS.SendTicketToPartner.key },
    ],
    operator: [
        { action: ACTIONS.View.key },
        { action: ACTIONS.Edit.key },
        { action: ACTIONS.SetTicketToReady.key },
        { action: ACTIONS.SendTicketToPartner.key }
    ],
    partner: [
        {
            action: ACTIONS.View.key,
            // If assigned to partner and status is SentToPartner or InProgress 
            condition: (user, entity) => user.id === entity.partnerId && [STATUSES.SentToPartner.key, STATUSES.InProgress.key].includes(entity.status)
        },
        //{ action: ACTIONS.EditTicketResult.key },
        { action: ACTIONS.SetTicketInProgress.key },
        { action: ACTIONS.SetTicketComplete.key },
    ],
    approver: [
        {
            action: ACTIONS.View.key,
            // If status is Completed or Approved
            condition: (user, entity) => [STATUSES.Completed.key, STATUSES.Approved.key].includes(entity.status)
        },
        { action: ACTIONS.ApproveTicket.key },
        { action: ACTIONS.RejectTicket.key },
    ]
}

const userActions = {
    administrator: [
        { action: ACTIONS.View.key },
        { action: ACTIONS.Edit.key },
        { action: ACTIONS.Delete.key },
        { action: ACTIONS.CreateUser.key },
    ],
    operator: [
        { action: ACTIONS.View.key },
        // Can only edit your own profile
        { action: ACTIONS.Edit.key, condition: (user, entity) => user.id === entity.id },
        { action: ACTIONS.CreateTicket.key },
    ],
    partner: [
        { action: ACTIONS.View.key },
        // Can only edit your own profile
        { action: ACTIONS.Edit.key, condition: (user, entity) => user.id === entity.id },
    ],
    approver: [
        { action: ACTIONS.View.key },
        // Can only edit your own profile
        { action: ACTIONS.Edit.key, condition: (user, entity) => user.id === entity.id },
    ]
}

const entityActions = {
    'user': userActions,
    'ticket': ticketActions,
}

export function computeAllowedActions(user, entity) {
    if (!user || !entity || !entityActions[entity.type]) return [];
    const allowedByRole = entityActions[entity.type][user.role] || [];
    const result = [];

    for (const actionRec of allowedByRole) {
        const actionDef = ACTIONS[actionRec.action]
        if (!actionDef) continue;

        // Check action related to status 
        const fromStatuses = ACTIONS[actionRec.action]?.fromStatuses;
        if (fromStatuses && entity.status && !fromStatuses.includes(entity.status)) {
            continue;
        }
        // Check extra condition
        if (actionRec.condition && !actionRec.condition(user, entity)) {
            continue;
        }
        result.push(actionRec.action);
    }
    return result;
}

export function isAllowedAction(user, entity, action) {
    if (!user || !entity || !entityActions[entity.type]) return false;
    const allowedByRole = entityActions[entity.type][user.role] || [];
    const actionRec = allowedByRole.find(actionRec => actionRec.action === action);
    if (actionRec) {
        // Check action related to status workflow
        const fromStatuses = ACTIONS[actionRec.action]?.fromStatuses;
        if (fromStatuses && entity.status && !fromStatuses.includes(entity.status)) {
            return false;
        }
        // Check extra condition
        if (actionRec.condition && !actionRec.condition(user, entity)) {
            return false;
        }
        return true;
    }
    return false;
}

export function getNextStatus(user, entity, action) {
    return ACTIONS[action]?.nextStatus;
}