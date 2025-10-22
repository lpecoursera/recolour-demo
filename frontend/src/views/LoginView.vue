<template>
  <div class="login-page">
    <!-- Login box -->
    <div class="login-box">
      <h2 class="login-title">Login</h2>
      <p class="login-subtitle">
        Demo login — select a user to enter
      </p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-field">
          <FormSelect
            v-model="email"
            label="Email"
            :options="[
              { value: 'alice@example.com', label: 'alice@example.com (Alice Operator)' },
              { value: 'bob@example.com', label: 'bob@example.com (Bob Partner)' },
              { value: 'carol@example.com', label: 'carol@example.com (Carol Approver)' },
              { value: 'john@example.com', label: 'john@example.com (John Administrator)' }
            ]"
          />
        </div>

        <button type="submit" class="login-button">
          Login
        </button>

        <p v-if="error" class="login-error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import FormSelect from '../components/FormSelect.vue'

const auth = useAuthStore()
const email = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(email.value, "")
  } catch (err) {
    error.value = 'Invalid email'
  }
}
</script>

<style scoped lang="postcss">
.login-page {
  @apply flex justify-center items-center h-screen bg-gray-100;
}

.login-box {
  @apply bg-white p-8 rounded-2xl shadow-md w-96;
}

.login-title {
  @apply text-2xl font-semibold mb-2 text-center;
}

.login-subtitle {
  @apply text-sm text-gray-500 mb-6 text-center;
}

.login-form {
  @apply w-full;
}

.form-field {
  @apply mb-4;
}

.login-button {
  @apply w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors;
}

.login-error {
  @apply text-red-500 text-sm mt-3 text-center;
}
</style>
