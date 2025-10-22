<template>
  <section class="flex-1 p-6 overflow-auto">
    <div class="grid gap-4">
      <BaseCard v-for="user in userStore.partners" :key="user.id" fullWidth>
        <CardRow>
          <template #content>
            <div class="flex flex-row justify-between">
              <div class="flex-none w-32">
                <BaseAvatar
                  :src="user.avatar"
                  :name="user.name"
                  size="lg"
                  shadow
                  bgColor="bg-gray-200"
                ></BaseAvatar>
              </div>
              <div class="flex flex-1 flex-col">
                <p><strong>ID:</strong> {{ user.id }}</p>
                <p><strong>Name:</strong> {{ user.name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
              </div>
            </div>
          </template>
          <template #actions>
          </template>
        </CardRow>
      </BaseCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore'

import BaseCard from '../components/BaseCard.vue'
import CardRow from '../components/CardRow.vue'
import BaseAvatar from '../components/BaseAvatar.vue'

const userStore = useUserStore()

</script>
