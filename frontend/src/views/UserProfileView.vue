<template>
    <div class="flex justify-center items-center py-10 bg-gray-50 min-h-screen">
    <div class="bg-white shadow-md rounded-2xl w-full max-w-md p-6">
        <!-- Avatar -->
        <div class="flex flex-col items-center">
            <BaseAvatar
                :src="previewAvatar"
                :name="user?.name"
                size="xl"
                shadow
                bgColor="bg-gray-200"
            />
            <h2 class="text-2xl font-semibold text-gray-800">{{ user?.name }}</h2>
            <p class="text-gray-500 text-sm mb-2">{{ user?.email }}</p>
            <span
                class="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
            >
            {{ user?.role }}
            </span>
        </div>
    </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import type { User } from '../type/User'
import BaseAvatar from '../components/BaseAvatar.vue'
import FormSelect from '../components/FormSelect.vue'

const auth = useAuthStore()
const user = computed(() => auth.user)

const isEditing = ref(false)
const previewAvatar = ref(user.value?.avatar ?? '')

// Create a copy for editing
const editableUser = ref<User>({ ...(user.value as User) })

function triggerAction(action: string) {
  console.log(`Running action: ${action}`)
}

function logout() {
  auth.logout()
}

// When selecting a new avatar file
function onAvatarChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    previewAvatar.value = reader.result as string
    editableUser.value.avatar = previewAvatar.value
  }
  reader.readAsDataURL(file)
}

// Save button → update store
function saveChanges() {
  if (!user.value) return
  user.value.name = editableUser.value.name
  user.value.email = editableUser.value.email
  user.value.role = editableUser.value.role
  user.value.avatar = editableUser.value.avatar
  isEditing.value = false
}

// Cancel button → discard changes
function cancelEdit() {
  editableUser.value = { ...(user.value as User) }
  previewAvatar.value = user.value?.avatar ?? ''
  isEditing.value = false
}
</script>
