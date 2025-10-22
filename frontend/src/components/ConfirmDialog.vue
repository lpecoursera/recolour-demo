<template>
  <dialog
    ref="dialogRef"
    class="rounded-2xl p-6 w-full max-w-sm shadow-xl backdrop:bg-black/50"
    @cancel.prevent="cancel"
  >
    <h2 v-if="title" class="text-lg font-semibold mb-3">{{ title }}</h2>
    <p v-if="message" class="text-gray-700 mb-6 whitespace-pre-line">{{ message }}</p>

    <div class="flex justify-end gap-2">
      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        @click="cancel"
      >
        {{ cancelText }}
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        @click="confirm"
      >
        {{ confirmText }}
      </button>
    </div>
  </dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: Boolean,
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: 'Confirm' },
  cancelText: { type: String, default: 'Cancel' },
})

const emit = defineEmits(['confirm', 'cancel'])

const dialogRef = ref(null)

function confirm() {
  dialogRef.value?.close()
  emit('confirm')
}

function cancel() {
  dialogRef.value?.close()
  emit('cancel')
}

watch(
  () => props.open,
  (val) => {
    if (val) dialogRef.value?.showModal()
    else dialogRef.value?.close()
  }
)
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
