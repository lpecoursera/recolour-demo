<template>
  <div
    v-if="!compact"
    class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
    :class="modelData.getStatusColor(status)"
  >
    <component :is="modelData.getStatusIcon(status)" class="w-4 h-4" />
    <span>{{ modelData.getStatusLabel(status) }}</span>
  </div>

  <!-- Compact / inline version -->
  <span
    v-else
    class="inline-flex items-center gap-1 text-sm text-gray-800"
  >
    <component
      :is="modelData.getStatusIcon(status)"
      class="w-3 h-3 text-gray-500"
    />
    <span>{{ modelData.getStatusLabel(status) }}</span>
  </span>
</template>

<script setup lang="ts">
import { useModelDataStore } from '../stores/modelDataStore'

const modelData = useModelDataStore()

defineProps<{
  status: string
  compact?: boolean
}>()
</script>