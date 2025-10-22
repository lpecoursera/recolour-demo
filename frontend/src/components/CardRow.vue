<template>
  <div
    class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-full"
  >
    <!-- Left content -->
    <div class="text-left">
      <slot name="content" />
    </div>

    <!-- Right-side actions -->
    <div class="flex flex-wrap justify-end gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
defineSlots<{
  content(): void
  actions(): void
}>();
/**
 * CardRow.vue
 * 
 * A small layout helper for placing content on the left
 * and action buttons on the right inside a card.
 *
 * Props:
 *  - none (pure layout)
 *
 * Slots:
 *  - `content`: main text/info section (left)
 *  - `actions`: button/action area (right)
 */
</script>

<style scoped lang="postcss">
</style>
