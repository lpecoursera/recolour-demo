<template>
  <section class="ticket-list-section">
    <div v-if="tickets.length==0" class="empty-list">
      No items in the list
    </div>

    <div class="ticket-grid">
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

            <p class="ticket-divider"></p>

            <div class="ticket-photos">
              <div v-for="photoId in ticket.photoIds" :key="photoId" class="ticket-photo-wrapper">
                <img class="ticket-photo" :src="`${IMAGE_BASE_URL}/photos/${ticket.folder}/${photoId}.jpg`" />
                <div class="ticket-photo-label">{{"&nbsp;&nbsp;" + getPhotoLabel(photoId)}}</div>
              </div>
            </div>

            <p class="ticket-guide">{{ ticket.guide }}</p>
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
// (Unchanged)
defineProps<{ tickets: Ticket[] }>()
import { IMAGE_BASE_URL } from '../config.ts'
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
  const photoParts = photoId.split('_')
  return photoParts[2] ? photoParts[2] : photoParts[0]
}

function includeAction(ticket: Ticket, actionRec: Record<string, any>): boolean {
  if (!ticket?.actions) return false
  if (actionRec.key === "View" || actionRec.key === "Edit") return false
  return ticket.actions.includes(actionRec.key)
}

async function doaction(entityId: string, actionKey: string, data?: Record<string, any>[]) {
  await ticketStore.ticketAction(entityId, actionKey, data)
}
</script>

<style scoped lang="postcss">
.ticket-list-section {
  @apply flex-1 p-6 overflow-auto;
}

.empty-list {
  @apply text-gray-500 text-sm;
}

.ticket-grid {
  @apply grid gap-4;
}

/* Info list styling */
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

/* Divider line */
.ticket-divider {
  @apply mt-4 mb-4 border-t border-gray-200 text-gray-500 text-sm;
}

/* Photos container */
.ticket-photos {
  @apply flex flex-row gap-2 flex-wrap;
}

.ticket-photo-wrapper {
  @apply flex flex-col items-center;
}

.ticket-photo {
  @apply h-12; /* 50px approx */
}

.ticket-photo-label {
  @apply text-xs text-center;
}

/* Guide text */
.ticket-guide {
  @apply text-gray-500 text-sm whitespace-pre-line;
}

/* Button base styling (if used here) */
.base-button {
  @apply rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300;
  min-width: 6.5rem;
  text-align: center;
  white-space: nowrap;
}
</style>
