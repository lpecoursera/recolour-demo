import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'
import { apiFetch } from '../api/client.ts'
import type { User } from '../type/User'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>()

    const isAuthenticated = computed(() => !!token.value)

    // load user data from backend (if token exists)
    async function fetchUser() {
        if (!token.value) return
        try {
            const res = await apiFetch<any>('/me', {
                parseJson: false,
            });
            if (res) {
                user.value = await res.json()
            } else {
                throw Error("No user returned from /me");
            }
        } catch (error) {
            logout();
        }
    }

    async function login(email: string, password: string) {
        logout();
        try {
            const res = await apiFetch<any>('/login', {
                method: 'POST',
                includeToken: false,
                parseJson: false,
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json()
            token.value = data

            router.replace({ path: '/' })

        } catch (error) {
            throw new Error('Login failed')
        }
    }

    function logout() {
        token.value = null
        user.value = null
    }

    return { user, token, isAuthenticated, login, logout, fetchUser }
})
