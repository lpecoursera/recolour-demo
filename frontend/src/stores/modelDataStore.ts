import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiFetch } from '../api/client.ts'
import { useUserStore } from './userStore.ts'
import type { Status } from '../type/Status.ts'
import type { Action, OptionResolver } from '../type/Action.ts'
import * as Icons from "lucide-vue-next"

export const useModelDataStore = defineStore('modelData', () => {
    const statusesByKey = ref<Record<string, Status>>({})
    const actions = ref<Record<string, Action>>({})

    const userStore = useUserStore();

    const optionResolvers: Record<string, OptionResolver> = {
        partners: () =>
            userStore.partners.map(partner => ({
                key: partner.id,
                label: partner.name,
            })),
    };

    // Fetch statuses and action definitions from backend
    async function initModelData() {
        try {
            const statusRes = await apiFetch<any>('/modeldata/statuses', {
                parseJson: false
            });
            const actionRes = await apiFetch<any>('/modeldata/actions', {
                parseJson: false
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
