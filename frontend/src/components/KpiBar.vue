<template>
  <div v-if='role==="operator"' class="flex flex-col gap-4 p-6 bg-white border-b shadow-sm">
    <KpiCard label="Being defined" color="yellow" :value="newTicket" />
    <KpiCard label="At Partner" color="blue" :value="atPartner" />
    <KpiCard label="Completed" color="green" :value="completed" />
    <KpiCard label="Rejected" color="red" :value="rejected" />
    <KpiCard label="Approved" color="green" :value="approved" />
  </div>
  <div v-else-if='role==="partner"' class="flex flex-col gap-4 p-6 bg-white border-b shadow-sm">
    <KpiCard label="Incoming Tickets" color="yellow" :value="partnerNewTicket" />
    <KpiCard label="In Progress" color="blue" :value="partnerInProgress" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTicketStore } from '../stores/ticketStore'
import { useAuthStore } from '../stores/auth'
import KpiCard from './KpiCard.vue'

const auth = useAuthStore()
const ticketStore = useTicketStore()

const role = auth.user?.role;

const newTicket = computed(() => ticketStore.tickets.filter(t => t.status === 'Draft' || t.status === 'ReadyForImplementation').length)
const atPartner = computed(() => ticketStore.tickets.filter(t => t.status === 'SentToPartner' || t.status === 'InProgress').length)
const completed = computed(() => ticketStore.tickets.filter(t => t.status === 'Completed').length)
const rejected = computed(() => ticketStore.tickets.filter(t => t.status === 'Rejected').length)
const approved = computed(() => ticketStore.tickets.filter(t => t.status === 'Approved').length)

const partnerNewTicket = computed(() => ticketStore.tickets.filter(t => t.status === 'SentToPartner').length)
const partnerInProgress = computed(() => ticketStore.tickets.filter(t => t.status === 'InProgress').length)


</script>
