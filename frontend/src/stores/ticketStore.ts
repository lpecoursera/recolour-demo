import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSocket } from '../socket'
import { apiFetch } from '../api/client.ts'
import { useUiStore } from '../stores/useUiStore.ts'
import type { Ticket } from '../type/Ticket.ts'

export const useTicketStore = defineStore('tickets', () => {
    const uiStore = useUiStore()

    const tickets = ref<Ticket[]>([]);
    const openTickets = computed(() => tickets.value.filter(t => t.status !== 'Approved'));
    const filteredOpenTickets = computed(() =>
        openTickets.value.filter(ticket =>
            (!uiStore.ticketFilters.status || ticket.status === uiStore.ticketFilters.status) &&
            (!uiStore.ticketFilters.partnerId || (ticket.partnerId && (ticket.partnerId === uiStore.ticketFilters.partnerId)))
        )
    );
    const approvedTickets = computed(() => tickets.value.filter(t => t.status === 'Approved'));

    // Fetch all tickets from backend
    async function initTickets(): Promise<void> {
        try {
            const resultTickets = await apiFetch<Ticket[]>('/tickets');
            if (resultTickets) {
                tickets.value = resultTickets;
            }
        } catch (error) {
            console.error('initTickets', error);
        }
    }

    // Get a single ticket
    function getTicket(id: string): Ticket | undefined {
        return tickets.value.find(t => t.id === id);
    }

    // Save a new ticket
    async function saveTicket(ticket: Ticket): Promise<void> {
        try {
            const resultTicket = await apiFetch<Ticket>('/tickets', {
                method: 'POST',
                body: JSON.stringify(ticket)
            });
            if (resultTicket) {
                _addOrUpdateTicket(resultTicket);
            }
        } catch (error) {
            console.error('saveTicket', error);
        }
    }

    // Update an existing ticket
    async function updateTicket(id: string, partialTicket: Partial<Ticket>) {
        try {
            const resultTicket = await apiFetch<Ticket>(`/tickets/${id}`, {
                method: 'PUT',
                body: JSON.stringify(partialTicket)
            });
            if (resultTicket) {
                _addOrUpdateTicket(resultTicket);
            }
        } catch (error) {
            console.error('updateTicket', error);
        }
    }

    // Ticket action (workflow)
    async function ticketAction(id: string, actionKey: string, data?: Record<string, any>[]) {
        try {
            const resultTicket = await apiFetch<Ticket>(`/tickets/${id}/actions`, {
                method: 'PUT',
                body: JSON.stringify({ actionKey: actionKey, payload: data })
            });
            if (resultTicket) {
                _addOrUpdateTicket(resultTicket);
            }
        } catch (error) {
            uiStore.confirm({
                title: "Error doing this action",
                message: "There was a problem handling the requested action",
            });
        }
    }

    // Delete a ticket
    async function deleteTicket(id: string) {
        try {
            await apiFetch(`/tickets/${id}`, {
                method: 'DELETE',
                parseJson: false
            });
            _RemoveTicket(id);
        } catch (error) {
            console.error('deleteTicket', error);
        }
    }

    function _addOrUpdateTicket(ticket: Ticket): void {
        const idx = tickets.value.findIndex(t => t.id === ticket.id);
        if (idx !== -1) {
            tickets.value[idx] = ticket;
        } else {
            tickets.value.push(ticket);
        }
    }

    function _RemoveTicket(id: string): void {
        tickets.value = tickets.value.filter(t => t.id !== id);
    }

    // Listen for socket emits
    function initSocketListeners() {
        try {
            const socket = getSocket();
            socket.on('ticket:create', (ticket: Ticket) => {
                console.log("Ticket emit: ticket:create", ticket);
                _addOrUpdateTicket(ticket);
            });
            socket.on('ticket:update', (ticket: Ticket) => {
                console.log("Ticket emit: ticket:update", ticket);
                _addOrUpdateTicket(ticket);
            });
            socket.on('ticket:remove', ({ id }) => {
                console.log("Ticket emit: ticket:remove", id);
                _RemoveTicket(id);
            });
        } catch (err) {
            console.warn('Socket not ready yet, skipping ticket listener init');
        }
    }

    return { tickets, openTickets, filteredOpenTickets, approvedTickets, initTickets, getTicket, saveTicket, updateTicket, ticketAction, deleteTicket, initSocketListeners };
})
