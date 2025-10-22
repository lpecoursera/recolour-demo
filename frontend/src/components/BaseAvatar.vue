<template>
  <div
    :class="[
      'relative rounded-full overflow-hidden flex items-center justify-center shrink-0',
      sizeClass,
      ring && 'ring-2 ring-offset-2 ring-blue-300',
    ]"
  >
    <!-- Avatar image -->
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <!-- Fallback with initials or placeholder -->
    <div
      v-else
      :class="[
        'flex items-center justify-center text-white font-semibold',
        bgColor,
      ]"
    >
      <slot>{{ initials }}</slot>
    </div>

    <!-- Optional shadow overlay -->
    <div v-if="shadow" class="absolute inset-0 rounded-full shadow"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ring?: boolean
  shadow?: boolean
  bgColor?: string
}>()

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs': return 'w-6 h-6 text-xs'
    case 'sm': return 'w-8 h-8 text-sm'
    case 'md': return 'w-16 h-16 text-base'
    case 'lg': return 'w-24 h-24 text-lg'
    case 'xl': return 'w-28 h-28 text-xl'
    default: return 'w-10 h-10 text-sm'
  }
})
</script>
