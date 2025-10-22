<template>
  <section class="flex-1 p-6 overflow-auto">
    <div v-if="tickets.length==0">
      No items in the list
    </div>
    <div class="grid gap-4">
      <BaseCard v-for="ticket in tickets" :key="ticket.id" fullWidth>
        <CardRow>
          <template #content>
            <dl class="info-list">
              <template v-if="ticket.id">
                <dt>Id:</dt>
                <dd>{{ ticket.id }}</dd>
              </template>
              <template v-if="ticket.status">
                <dt>Status:</dt>
                <dd><StatusBadge :status="ticket.status" compact /></dd>
              </template>
              <template v-if="ticket.priority">
                <dt>Priority:</dt>
                <dd>{{ ticket.priority }}</dd>
              </template>
              <template v-if="ticket.partnerId">
                <dt>Partner:</dt>
                <dd>{{ userStore.getUserName(ticket.partnerId) }}</dd>
              </template>
              <template v-if="ticket.note">
                <dt>Note:</dt>
                <dd class="wrap">{{ ticket.note }}</dd>
              </template>
              <template v-if="ticket.approverId">
                <dt>Approved by:</dt>
                <dd>{{ userStore.getUserName(ticket.approverId) }}</dd>
              </template>
              <template v-if="ticket.rejecterId">
                <dt>Rejected by:</dt>
                <dd>{{ userStore.getUserName(ticket.rejecterId) }}</dd>
              </template>
              <template v-if="ticket.rejectComment">
                <dt>Reject Comment:</dt>
                <dd class="wrap">{{ ticket.rejectComment }}</dd>
              </template>
            </dl>
            <p class="mt-4 mb-4 border-t border-gray-200 text-gray-500 text-sm"></p>
            <div class="flex flex-row gap-2 flex-wrap">
              <div v-for="photoId in ticket.photoIds" :key="photoId">
                <img class="ticket-photo" :src="`http://localhost:3000/photos/${ticket.folder}/${photoId}.jpg`" />
                <div class="text-xs">{{"&nbsp;&nbsp;" + getPhotoLabel(photoId)}}</div>
              </div>
              </div>
            <p class="ticket-guide text-gray-500 text-sm">{{ ticket.guide }}</p>
          </template>
          <template #actions>
            <template v-for="actionRec in modelData.actions">
              <ActionButton 
              v-if="includeAction(ticket, actionRec)" 
              :variant="actionRec.key === 'delete' ? 'danger' : 'outline'"
              :ticket="ticket" 
              :actionKey="actionRec.key"
              @doaction="doaction" />
            </template>
          </template>
        </CardRow>
      </BaseCard>
    </div>
  </section>
</template>

<script setup lang="ts">

defineProps<{
  tickets: Ticket[]
}>()

import { useModelDataStore } from '../stores/modelDataStore.ts'
import { useTicketStore } from '../stores/ticketStore.ts'
import { useUserStore } from '../stores/userStore.ts'

import type { Ticket } from '../type/Ticket.ts'
import BaseCard from '../components/BaseCard.vue'
import CardRow from '../components/CardRow.vue'
import ActionButton from '../components/ActionButton.vue'
import StatusBadge from '../components/StatusBadge.vue'

const modelData = useModelDataStore()
const ticketStore = useTicketStore()
const userStore = useUserStore()

function getPhotoLabel(photoId: string) {
  const photoParts = photoId.split('_');
  return photoParts[2] ? photoParts[2] : photoParts[0];
}

function includeAction(ticket: Ticket, actionRec: Record<string, any>): boolean {
  if (!ticket?.actions) {
    console.warn(`Action info is missing on ticket ${ticket?.id}`);
    return false;
  }
  if (actionRec.key === "View" || actionRec.key === "Edit") {
    return false; // TODO: These must be handled later
  }
  return (ticket.actions.includes(actionRec.key));
}

async function doaction(entityId: string, actionKey: string, data?: Record<string, any>[]) {
  await ticketStore.ticketAction(entityId, actionKey, data);
}
</script>

<style scoped lang="postcss">
.info-list {
  @apply grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm;
}

.info-list dt {
  @apply text-gray-500 font-medium;
}

.info-list dd {
  @apply text-gray-900 truncate;
}

.info-list dd.wrap {
  @apply text-gray-900 break-words whitespace-pre-wrap;
}
.base-button {
  @apply rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300;
  min-width: 6.5rem;
  text-align: center;
  white-space: nowrap;
}
</style>

<style scoped>
.ticket-guide {
  white-space: pre-line;
}
.ticket-photo {
  height: 50px;
}
</style>
