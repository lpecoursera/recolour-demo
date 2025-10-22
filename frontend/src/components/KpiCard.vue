<template>
  <div 
    :class="[
      'flex-1 border rounded p-2 text-center transition-colors',
      bgColor.border, bgColor.bg
    ]"
  >
    <p class="text-sm text-gray-600">{{ label }}</p>
    <p :class="['text-2xl font-bold transition-colors', bgColor.text]">
      {{ displayValue }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  label: string
  color: 'yellow' | 'blue' | 'green' | 'red'
  value: number
}>()

const displayValue = ref(props.value)

// Animate the number when the prop changes
watch(
  () => props.value,
  (newValue, oldValue) => {
    const duration = 400 // ms
    const startTime = performance.now()
    const startValue = oldValue
    const change = newValue - oldValue

    function animate(time: number) {
      const progress = Math.min((time - startTime) / duration, 1)
      displayValue.value = Math.round(startValue + change * progress)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }
)

const bgColor = computed(() => {
  switch (props.color) {
    case 'yellow':
      return { bg: 'bg-yellow-100', border: 'border-yellow-300', text: 'text-yellow-700' }
    case 'blue':
      return { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' }
    case 'green':
      return { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700' }
    case 'red':
      return { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-700' }
  }
})
</script>
