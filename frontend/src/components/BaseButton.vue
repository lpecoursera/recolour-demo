<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="[
      'base-button',
      variantClass,
      sizeClass,
      props.fullWidth && 'w-full',
      props.disabled && 'opacity-60 cursor-not-allowed',
      props.className,
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}>()

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600'
    case 'outline':
      return 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    case 'ghost':
      return 'text-gray-600 hover:bg-gray-100'
    default:
      return 'bg-blue-500 text-white hover:bg-blue-600' // primary
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1 text-sm'
    case 'lg':
      return 'px-6 py-3 text-lg'
    default:
      return 'px-4 py-2 text-base'
  }
})
</script>

<style scoped lang="postcss">
.base-button {
  @apply rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300;
}
</style>
