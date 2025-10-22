<template>
    <div class="flex flex-col h-full pb-12">
        <div v-if="showFilterHeader" class="flex items-center justify-between w-full px-6 pt-2 border-b bg-gray-50">
            <TicketFilterBar />
            <BaseButton @click="showForm = !showForm" 
                :variant="showForm ? 'outline' : 'primary'">
                {{ showForm ? 'Close Form' : '+ New Ticket' }}
            </BaseButton>
        </div>
        <div class="flex flex-1 overflow-hidden">
            <router-view></router-view>
            <transition name="slide">
                <aside v-if="showForm" class="w-96 bg-white border-l shadow-lg p-4 overflow-auto">
                <h3 class="text-lg font-semibold mb-4">Create Ticket</h3>
                <TicketForm @ticketCreated="handleTicketCreated" />
                </aside>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TicketFilterBar from '../components/TicketFilterBar.vue'
import BaseButton from '../components/BaseButton.vue'
import TicketForm from '../components/TicketForm.vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore();

const userRole = auth.user?.role;
const showFilterHeader: boolean = (userRole === "administrator" || userRole === 'operator');

const showForm = ref(false);

function handleTicketCreated() {
    showForm.value = false
}
</script>


