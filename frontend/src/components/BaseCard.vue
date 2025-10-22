<template>
  <div
    :class="[
      'base-card',
      fullWidth ? 'w-full' : 'max-w-sm',
      hoverable && 'hover:shadow-lg transition-shadow',
      className,
    ]"
    v-on="$attrs"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  fullWidth?: boolean
  hoverable?: boolean
  className?: string
}>()
</script>

<style scoped lang="postcss">
.base-card {
  @apply bg-white shadow-md rounded-2xl p-6 flex flex-col items-center;
}
</style>

