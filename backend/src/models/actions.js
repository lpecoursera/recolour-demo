import { STATUSES } from '../models/statuses.js'
export const ACTIONS = {
    View: { key: 'View', label: 'View', icon: 'Eye', color: 'gray' },
    Edit: { key: 'Edit', label: 'Edit', icon: 'Pencil', color: 'blue' },
    Delete: { key: 'Delete', label: 'Delete', icon: 'Trash2', color: 'red' },

    CreateUser: { key: 'CreateUser', label: 'Create User', icon: 'UserPlus', color: 'green' },
    CreateTicket: { key: 'CreateTicket', label: 'Create Ticket', icon: 'FilePlus', color: 'green' },

    EditTicketResult: { key: 'EditTicketResult', label: 'Edit', icon: 'Edit3', color: 'blue' },

    SetTicketToReady: {
        key: 'SetTicketToReady',
        label: 'Set to Ready',
        icon: 'ClipboardCheck',
        color: 'cyan',
        confirm: { message: 'Are you sure you want to set this ticket to ready?' },
        fromStatuses: [STATUSES.Draft.key],
        nextStatus: STATUSES.ReadyForImplementation.key
    },
    SendTicketToPartner: {
        key: 'SendTicketToPartner',
        label: 'Send to Partner',
        icon: 'Send',
        color: 'amber',
        requiredInput: {
            fields: [
                { name: 'partnerId', label: 'Partner', type: 'select', source: 'partners' }
            ]
        },
        fromStatuses: [STATUSES.ReadyForImplementation.key, STATUSES.Rejected],
        nextStatus: STATUSES.SentToPartner.key
    },
    SetTicketInProgress: {
        key: 'SetTicketInProgress',
        label: 'Start Progress',
        icon: 'Play',
        color: 'blue',
        fromStatuses: [STATUSES.SentToPartner.key],
        nextStatus: STATUSES.InProgress.key
    },
    SetTicketComplete: {
        key: 'SetTicketComplete',
        label: 'Set Completed',
        icon: 'CheckCircle2',
        color: 'emarald',
        confirm: { message: 'Are you sure you want to set this ticket to completed?' },
        fromStatuses: [STATUSES.InProgress.key],
        nextStatus: STATUSES.Completed.key
    },
    ApproveTicket: {
        key: 'ApproveTicket',
        label: 'Approve',
        icon: 'ThumbsUp',
        color: 'green',
        confirm: { message: 'Are you sure you want to approve this ticket?' },
        fromStatuses: [STATUSES.Completed.key],
        nextStatus: STATUSES.Approved.key
    },
    RejectTicket: {
        key: 'RejectTicket',
        label: 'Reject',
        icon: 'XCircle',
        color: 'red',
        requiredInput: {
            fields: [
                { name: 'rejectComment', label: 'Please describe why', type: 'textarea' }
            ]
        },
        fromStatuses: [STATUSES.Completed.key],
        nextStatus: STATUSES.Rejected.key
    }
}
