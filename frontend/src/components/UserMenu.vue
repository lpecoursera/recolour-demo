<template>
  <div class="relative" ref="menuRef">
    <!-- Trigger button -->
    <button
      @click="toggleMenu"
      class="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <BaseAvatar
            :src="user?.avatar"
            :name="user?.name"
            size="sm"
            bgColor="bg-blue-500"
        >
        </BaseAvatar>
        <span class="hidden sm:inline text-sm font-medium text-gray-700">
            {{ user?.name }}
        </span>
        <svg
            class="w-4 h-4 text-gray-500 hidden sm:block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    <!-- Dropdown menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
      >
        <ul class="py-2 text-sm text-gray-700">
          <li>
            <button @click="navigate('/user')" class="menu-item">
              👤 Show Profile
            </button>
          </li>
          <li>
            <button @click="logout" class="menu-item text-red-600">
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import BaseAvatar from './BaseAvatar.vue'

const auth = useAuthStore()
const router = useRouter()

const user = computed(() => auth.user)
const open = ref(false)
const menuRef = ref<HTMLElement | null>(null)

/*
const initials = computed(() =>
  user.value?.name
    ? user.value.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '?'
)
*/

function toggleMenu() {
  open.value = !open.value
}

function closeMenu(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

function navigate(path: string) {
  open.value = false
  router.push(path)
}

function logout() {
  auth.logout()
  open.value = false
  router.push('/login')
}

onMounted(() => document.addEventListener('click', closeMenu))
onBeforeUnmount(() => document.removeEventListener('click', closeMenu))
</script>

<style scoped lang="postcss">
.menu-item {
  @apply w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors;
}
</style>
