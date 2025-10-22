<template>
  <div class="user-profile-page">
    <div class="profile-card">
      <!-- Avatar -->
      <div class="profile-header">
        <BaseAvatar
          :src="previewAvatar"
          :name="user?.name"
          size="xl"
          shadow
          bg-color="avatar-bg"
          class="avatar"
        />
        <h2 class="user-name">{{ user?.name }}</h2>
        <p class="user-email">{{ user?.email }}</p>
        <span class="user-role">{{ user?.role }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import BaseAvatar from '../components/BaseAvatar.vue'

const auth = useAuthStore()
const user = computed(() => auth.user)
const previewAvatar = ref(user.value?.avatar ?? '')
</script>

<style scoped lang="postcss">
.user-profile-page {
  @apply flex justify-center items-center py-10 bg-gray-50 min-h-screen;
}

.profile-card {
  @apply bg-white shadow-md rounded-2xl w-full max-w-md p-6;
}

.profile-header {
  @apply flex flex-col items-center;
}

.avatar {
  @apply mb-4;
}

.avatar-bg {
  @apply bg-gray-200;
}

.user-name {
  @apply text-2xl font-semibold text-gray-800;
}

.user-email {
  @apply text-gray-500 text-sm mb-2;
}

.user-role {
  @apply inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full;
}
</style>
