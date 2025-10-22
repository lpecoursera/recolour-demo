<template>
  <BaseButton
    :variant="variantClass"
    size="sm"
    @click="handleClick"
  >
    <component v-if="IconComponent" :is="IconComponent" class="inline-block w-4 h-4 mr-1 relative -top-0.5" />
    {{ label }}
  </BaseButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'
import { useUiStore } from '../stores/useUiStore'
import { useModelDataStore } from '../stores/modelDataStore'
import BaseButton from './BaseButton.vue'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';

interface Props {
  ticket: Record<string, any>
  actionKey: string
  variant?: ButtonVariant
}

const props = defineProps<Props>()

const emit = defineEmits<{
  doaction: [entityId: string, actionKey: string, formData?: Record<string, any>[]]
}>()

const uiStore = useUiStore()
const modelData = useModelDataStore()

const actionMeta = computed(() => modelData.actions[props.actionKey])
const label = computed(() => actionMeta.value?.label || props.actionKey)
const iconName = computed(() => actionMeta.value?.icon)
const IconComponent = computed(() => {
  const name = iconName.value
  return name ? (LucideIcons as any)[name] : null
})

// Use BaseButton’s variants instead of raw colors
const variantClass = computed(() => {
  if (props.variant) return props.variant
  if (actionMeta.value?.color === 'red') return 'danger'
  if (actionMeta.value?.color === 'gray') return 'secondary'
  if (actionMeta.value?.color === 'outline') return 'outline'
  return 'primary'
})

async function handleClick() {
  const meta = actionMeta.value
  if (!meta) return

  if (meta.requiredInput) {
    const formData = await uiStore.openActionDialog(meta)
    if (!formData) return
    emit('doaction', props.ticket.id, props.actionKey, formData)
    return
  }

  if (meta.confirm) {
    const ok = await uiStore.confirm({
      title: meta.label,
      message: meta.confirm.message,
    })
    if (!ok) return
  }

  emit('doaction', props.ticket.id, props.actionKey)
}
</script>
