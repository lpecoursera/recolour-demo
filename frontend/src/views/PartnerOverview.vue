<template>
  <section class="partner-list">
    <div class="grid gap-4">
      <BaseCard v-for="user in userStore.partners" :key="user.id" fullWidth>
        <CardRow>
          <template #content>
            <div class="user-info-row">
              <div class="avatar-col">
                <BaseAvatar
                  :src="user.avatar"
                  :name="user.name"
                  size="lg"
                  shadow
                  bg-color="avatar-bg"
                />
              </div>
              <dl class="info-col">
                <div class="info-item">
                  <dt>ID:</dt>
                  <dd>{{ user.id }}</dd>
                </div>
                <div class="info-item">
                  <dt>Name:</dt>
                  <dd>{{ user.name }}</dd>
                </div>
                <div class="info-item">
                  <dt>Email:</dt>
                  <dd>{{ user.email }}</dd>
                </div>
              </dl>
            </div>
            <div class="info-footer"></div>
          </template>
          <template #actions></template>
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

<style scoped lang="postcss">
.partner-list {
  @apply flex-1 p-6 overflow-auto;
}

.user-info-row {
  @apply flex flex-row justify-between gap-4;
}

.avatar-col {
  @apply flex-none w-32;
}

.avatar-bg {
  @apply bg-gray-200;
}

.info-col {
  @apply flex-1 flex flex-col gap-1;
}

.info-item {
  @apply flex flex-row gap-2;
}

.info-item dt {
  @apply font-semibold text-gray-700 w-20;
}

.info-item dd {
  @apply text-gray-900 truncate;
}

.info-footer {
  @apply mt-4 border-t border-gray-200;
}
</style>
