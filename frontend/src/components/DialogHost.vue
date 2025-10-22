<!-- components/DialogHost.vue -->
<template>
  <ConfirmDialog
    v-show="uiStore.dialogHost.confirmState.open"
    v-bind="uiStore.dialogHost.confirmState"
    @confirm="uiStore.dialogHost.confirmState.resolve(true)"
    @cancel="uiStore.dialogHost.confirmState.resolve(false)"
  />

  <ActionDialog
    v-show="uiStore.dialogHost.actionState.open"
    v-bind="uiStore.dialogHost.actionState"
    :actionMeta="uiStore.dialogHost.actionState.meta"
    @confirm="onActionConfirm"
    @cancel="uiStore.dialogHost.actionState.resolve(null)"
  />
</template>

<script setup>
import ConfirmDialog from './ConfirmDialog.vue'
import ActionDialog from './ActionDialog.vue'
import { useUiStore } from '../stores/useUiStore'

const uiStore = useUiStore()

function onActionConfirm(formData) {
  uiStore.dialogHost.actionState.resolve(formData)
  uiStore.dialogHost.actionState.open = false
}
</script>
