<template>

  <div class="flex flex-1 overflow-hidden">
    <Sidebar />
    <main class="flex-1 flex flex-col bg-gray-100">
      <Topbar />
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Topbar from '../components/Topbar.vue'
import Sidebar from '../components/Sidebar.vue'
</script>
