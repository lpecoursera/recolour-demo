<template>
  <form @submit.prevent="createTicket">
    <div>
    <label class="my_label" >Guide</label>
    <textarea v-model="guide" type="textarea" class="my_input" />
    </div>
    <div>
    <label class="my_label">Note</label>
    <input v-model="note" class="my_input"/>
    </div>
    <div>
    <label class="my_label">Priority</label>
    <select v-model="priority" class="my_input">
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    </div>
    <div class="flex items-end justify-end">
    <base-button type="submit" variant="primary" size="lg" className="mt-2">Create Ticket</base-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTicketStore } from '../stores/ticketStore'
import type { Ticket } from '../type/Ticket'
import BaseButton from '../components/BaseButton.vue'

const ticketStore = useTicketStore()
const emit = defineEmits<{
  (e: 'ticketCreated'): void
}>()

const guide = ref('')
const note = ref('')
const priority = ref('')

async function createTicket() {

  const ticket: Ticket = {
    photoIds: [],
    type: 'ticket',
    status: 'Draft',
    guide: guide.value,
    note: note.value,
    priority: priority.value,
  }
  await ticketStore.saveTicket(ticket);
  emit('ticketCreated')

  // Reset form
  guide.value = ''
  note.value = ''
  priority.value = ''
}
</script>
<style scoped lang="postcss">
.my_label {
  @apply block text-sm font-medium text-gray-600;
}
.my_input {
  @apply w-full border rounded-md p-2 mb-2;
}
</style>
