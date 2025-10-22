import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reactive } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const sidebarOpen = ref(true)
    const userMenuOpen = ref(false)
    const dialogHost = reactive({
        confirmState: {
            open: false,
            title: '',
            message: '',
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            resolve: (value: boolean) => { },
        },
        actionState: {
            open: false,
            meta: null as any,
            resolve: (value: any) => { },
        },
    });
    const ticketFilters = reactive({
        status: '',
        partnerId: '',
    })

    function toggleSidebar() {
        sidebarOpen.value = !sidebarOpen.value
    }

    function toggleUserMenu() {
        userMenuOpen.value = !userMenuOpen.value
    }

    async function confirm(options: {
        title?: string
        message: string
        confirmText?: string
        cancelText?: string
    }): Promise<boolean> {
        return new Promise((resolve) => {
            dialogHost.confirmState.open = true
            dialogHost.confirmState.title = options.title || 'Confirm'
            dialogHost.confirmState.message = options.message
            dialogHost.confirmState.confirmText = options.confirmText || 'Confirm'
            dialogHost.confirmState.cancelText = options.cancelText || 'Cancel'
            dialogHost.confirmState.resolve = (result: boolean) => {
                dialogHost.confirmState.open = false
                resolve(result)
            }
        })
    }

    async function openActionDialog(actionMeta: any): Promise<Record<string, any>[] | null> {
        return new Promise((resolve) => {
            dialogHost.actionState.open = true
            dialogHost.actionState.meta = actionMeta
            dialogHost.actionState.resolve = (formData: any) => {
                dialogHost.actionState.open = false
                resolve(formData)
            }
        })
    }

    return { sidebarOpen, userMenuOpen, dialogHost, ticketFilters, toggleSidebar, toggleUserMenu, confirm, openActionDialog }
})
