import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth.ts'
import { useUserStore } from './userStore.ts'
import type { Status } from '../type/Status.ts'
import type { Action, OptionResolver } from '../type/Action.ts'
import * as Icons from "lucide-vue-next"

export const useModelDataStore = defineStore('modelData', () => {
    const statusesByKey = ref<Record<string, Status>>({})
    const actions = ref<Record<string, Action>>({})

    const auth = useAuthStore();
    const userStore = useUserStore();

    const optionResolvers: Record<string, OptionResolver> = {
        partners: () =>
            userStore.partners.map(partner => ({
                key: partner.id,
                label: partner.name,
            })),
    };

    // Fetch all tickets from backend
    async function initModelData() {
        try {
            const statusRes = await fetch('http://localhost:3000/api/modeldata/statuses', {
                headers: { 'X-User-Id': auth.token || '' },
            });
            const actionRes = await fetch('http://localhost:3000/api/modeldata/actions', {
                headers: { 'X-User-Id': auth.token || '' },
            });
            if (statusRes.ok && actionRes) {
                const statusResponse = await statusRes.json();
                const actionResponse = await actionRes.json();
                statusesByKey.value = statusResponse.data;
                actions.value = actionResponse.data;

                // Merge client-only resolvers into action definitions
                // Needed for confirm/input dialogs
                for (const [_, action] of Object.entries(actions.value)) {
                    for (const field of action.requiredInput?.fields || []) {
                        if (field.source && optionResolvers[field.source]) {
                            field.getOptions = optionResolvers[field.source]
                        }
                    }
                }
            } else {
                console.error('initModelData not read correctly');
            }
        } catch (error) {
            console.error('initModelData', error);
        }
    }

    function getStatusLabel(key: string): string {
        return statusesByKey.value[key]?.label || key || "Unknown"
    }

    function getStatusIcon(key: string) {
        const iconName = statusesByKey.value[key]?.icon
        const iconsMap = Icons as Record<string, any>
        return iconName && iconsMap[iconName] ? iconsMap[iconName] : iconsMap.AlertCircle
    }

    function getStatusColor(key: string): string {
        const color = statusesByKey.value[key]?.color
        return color ? `text-${color}-700 bg-${color}-100` : "text-gray-700 bg-gray-100"
    }

    return { initModelData, statusesByKey, actions, getStatusLabel, getStatusIcon, getStatusColor }
});
