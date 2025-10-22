<template>
  <div class="flex flex-wrap gap-4 mb-4 items-end">
    <!-- Status filter -->
    <FormSelect
      v-model="filters.status"
      :options="statusOptions"
      label="Status"
    >
      <option value="">All statuses</option>
    </FormSelect>

    <!-- Partner filter -->
    <FormSelect
      v-model="filters.partnerId"
      :options="partnerOptions"
      label="Partner"
    >
      <option value="">All partners</option>
    </FormSelect>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '../stores/useUiStore'
import { useModelDataStore } from '../stores/modelDataStore'
import { useUserStore } from '../stores/userStore'
import FormSelect from './FormSelect.vue'

const uiStore = useUiStore()
const modelData = useModelDataStore()
const userStore = useUserStore()

const filters = uiStore.ticketFilters

// Status options
const statusOptions = computed(() => [
  { label: 'All statuses', value: '' },
  ...Object.values(modelData.statusesByKey)
  .filter(s => s.key !== 'Approved')
  .map(s => ({
    label: s.label,
    value: s.key
  }))
])

// Partner options
const partnerOptions = computed(() => [
  { label: 'All partners', value: '' },  // <-- added "All"
  ...userStore.partners.map(p => ({
    label: p.name,
    value: p.id
  }))
])

</script>
