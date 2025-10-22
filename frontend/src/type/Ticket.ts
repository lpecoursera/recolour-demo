export interface Ticket {
    id?: string,
    type: string,
    status: string,
    folder?: string,
    photoIds: string[],
    note?: string,
    guide?: string,
    priority?: string,
    partnerId?: string,
    approvedDate?: Date,
    approverId?: string,
    rejectedDate?: Date,
    rejecterId?: string,
    rejectComment?: string,
    actions?: string[]
}
