<template>
  <div class="user-list-page">
    <div class="container">
      <div class="grid-layout">
        <BaseCard
          v-for="user in users"
          :key="user.id"
          hoverable
          class="user-card"
        >
          <BaseAvatar
            :src="user.avatar"
            :name="user.name"
            size="lg"
            shadow
            bg-color="avatar-bg"
            class="avatar"
          />

          <!-- Info -->
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-email">{{ user.email }}</p>
          <span class="user-role">{{ user.role }}</span>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'

import BaseCard from '../components/BaseCard.vue'
import BaseAvatar from '../components/BaseAvatar.vue'

const { users } = useUserStore()
</script>

<style scoped lang="postcss">
.user-list-page {
  @apply bg-gray-50 min-h-screen py-10 px-4;
}

.container {
  @apply max-w-6xl mx-auto;
}

.grid-layout {
  @apply grid gap-6 sm:grid-cols-2 lg:grid-cols-3;
}

.user-card {
  @apply flex flex-col items-start p-6;
}

.avatar {
  @apply mb-4;
}

.avatar-bg {
  @apply bg-gray-200;
}

.user-name {
  @apply text-lg font-semibold text-gray-800;
}

.user-email {
  @apply text-gray-500 text-sm;
}

.user-role {
  @apply inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full;
}
</style>
