<template>
    <TicketList :tickets="ticketStore.approvedTickets " />
</template>

<script setup lang="ts">
import { useTicketStore } from '../stores/ticketStore'
import TicketList from '../components/TicketList.vue'

const ticketStore = useTicketStore();
</script>
