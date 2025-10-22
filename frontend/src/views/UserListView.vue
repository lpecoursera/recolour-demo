<template>
  <div class="bg-gray-50 min-h-screen py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-semibold text-gray-800 mb-8">Users</h1>
      <div
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
      <BaseCard
          v-for="user in users"
          :key="user.id"
          hoverable
        >
        <BaseAvatar
            :src="user.avatar"
            :name="user.name"
            size="lg"
            shadow
            bgColor="bg-gray-200"
        ></BaseAvatar>
          <!-- Info -->
          <h2 class="text-lg font-semibold text-gray-800">{{ user.name }}</h2>
          <p class="text-gray-500 text-sm">{{ user.email }}</p>
          <span
            class="inline-block mt-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {{ user.role }}
          </span>

          <!-- Actions -->
          <div class="flex gap-3 mt-6">
            <BaseButton @click="viewUser(user)">
              View
            </BaseButton>
            <BaseButton @click="editUser(user)">
              Edit
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '../type/User'
import { useUserStore } from '../stores/userStore'

import BaseButton from '../components/BaseButton.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseAvatar from '../components/BaseAvatar.vue'

const { users } = useUserStore()

const router = useRouter()

function viewUser(user: User) {
  router.push({ path: '/user', query: { id: user.id, mode: 'view' } })
}

function editUser(user: User) {
  router.push({ path: '/user', query: { id: user.id, mode: 'edit' } })
}
</script>
