<template>
    <main class="flex-1 flex flex-col bg-gray-100 h-screen">
      <router-view />
      <DialogHost />
    </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DialogHost from './components/DialogHost.vue'
import { useModelDataStore } from './stores/modelDataStore'
import { useTicketStore } from './stores/ticketStore'
import { useUserStore } from './stores/userStore'

const modelData = useModelDataStore()
const ticketStore = useTicketStore()
const userStore = useUserStore()

onMounted(() => {
  modelData.initModelData();
  userStore.initUsers()
  ticketStore.initTickets()
})
</script>
