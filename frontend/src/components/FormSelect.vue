<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-600 mb-1">
      {{ label }}
    </label>
    <select
      v-model="model"
      class="w-full border rounded-md p-2 bg-white"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: Option[]
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
