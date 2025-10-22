<template>
  <dialog
    ref="dialogRef"
    class="rounded-2xl p-6 w-full max-w-md shadow-xl backdrop:bg-black/50"
    @cancel.prevent="cancel"
  >
    <h2 class="text-lg font-semibold mb-4">{{ actionMeta?.label || 'Action' }}</h2>

    <form class="space-y-4" method="dialog" @submit.prevent>
      <div
        v-for="field in actionMeta?.requiredInput?.fields || []"
        :key="field.name"
      >
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{ field.label }}
        </label>

        <!-- Text input -->
        <input
          v-if="field.type === 'text'"
          v-model="form[field.name]"
          type="text"
          class="w-full border rounded-lg p-2"
        />

        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="form[field.name]"
          rows="3"
          class="w-full border rounded-lg p-2"
        ></textarea>

        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          v-model="form[field.name]"
          class="w-full border rounded-lg p-2"
        >
          <option
            v-for="opt in options[field.name] || []"
            :value="opt.key"
            :label="opt.label"
          >
            {{ opt.label }}
          </option>
        </select>
      </div>
    </form>

    <div class="flex justify-end gap-2 mt-6">
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        @click="confirm"
      >
        Confirm
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  actionMeta: Object,
})

const emit = defineEmits(['confirm', 'cancel'])

const dialogRef = ref(null)
const form = ref({})
const options = ref({})

// Confirm and Cancel handlers
function confirm() {
  dialogRef.value?.close()
  emit('confirm', { ...form.value })
}

function cancel() {
  dialogRef.value?.close()
  emit('cancel')
}

// React when `open` changes
watch(
  () => props.open,
  async (val) => {
    if (val) {
      dialogRef.value?.showModal()
      initForm()
      await loadOptions()
    } else {
      dialogRef.value?.close()
    }
  }
)

// Initialize form fields
function initForm() {
  form.value = {}

  const fields = props.actionMeta?.requiredInput?.fields || [];
  const context = props.actionMeta?.context || {};

  for (const field of fields) {
    form.value[field.name] = field.default || ''
  }
}

// Load select options if fields define a `source` endpoint
async function loadOptions() {
  options.value = {}
  for (const field of props.actionMeta?.requiredInput?.fields || []) {
    options.value[field.name] = await field.getOptions?.();
  }
}
</script>

<style scoped>
dialog[open] {
  animation: fadeIn 0.15s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
