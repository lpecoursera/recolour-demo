<template>
    <header class="flex justify-between items-center px-6 py-3 bg-white shadow-sm">
    <h1 class="text-lg font-semibold text-gray-800">
      {{ currentTitle }}
    </h1>
        <UserMenu />
    </header>
</template>

<script setup>
    import UserMenu from "./UserMenu.vue"
    import { useRoute } from 'vue-router'
    import { computed } from 'vue'

    const route = useRoute()

    const currentTitle = computed(() => {
        return route.meta.title ?? 'Dashboard'
    });    
</script>
