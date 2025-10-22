<template>
  <aside
    class="w-64 min-h-screen bg-gradient-to-b from-white to-slate-100 text-gray-800 border-r border-slate-200 shadow-sm flex flex-col"
  >
    <!-- App title -->
    <div class="p-4 text-2xl font-bold tracking-wide border-b border-slate-200">
      Ticket App
    </div>

    <!-- Navigation -->
    <nav class="flex-1 mt-4">
      <ul class="space-y-1">
        <li v-for="item in navItems" :key="item.to">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150"
            :class="isActive(item.to)
              ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
              : 'text-gray-700 hover:bg-slate-100 hover:text-indigo-600'"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <KpiBar />

    <div class="p-4 border-t border-slate-200 text-sm text-gray-500">
      © 2025 Ticket App
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { ListChecks, CheckCircle, Users, Building2 } from 'lucide-vue-next'
import KpiBar from './KpiBar.vue'

const route = useRoute()
const auth = useAuthStore();

const navItems = getNavItems();

function getNavItems() {
  switch (auth.user?.role) {
    case "operator":
      return [
        { to: '/queue/open', label: 'Ticket Queue', icon: ListChecks },
        { to: '/tickets/approved', label: 'Approved Tickets', icon: CheckCircle },
        { to: '/partners', label: 'Partner List', icon: Building2 },
        { to: '/users', label: 'User List', icon: Users },
      ];
    case "partner":
      return [
        { to: '/queue/open', label: 'Ticket Queue', icon: ListChecks },
      ];
    case "approver":
      return [
        { to: '/queue/open', label: 'Ticket Queue', icon: ListChecks },
      ];
    case "administrator":
      return [
        { to: '/queue/open', label: 'Ticket Queue', icon: ListChecks },
        { to: '/tickets/approved', label: 'Approved Tickets', icon: CheckCircle },
        { to: '/partners', label: 'Partner List', icon: Building2 },
        { to: '/users', label: 'User List', icon: Users },
      ];
    default:
      return [];
  }
}

const isActive = (path: string) =>
  computed(() => route.path.startsWith(path)).value
</script>
