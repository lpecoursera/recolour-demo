import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '../router'
import type { User } from '../type/User'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>()

    // derived state
    const isAuthenticated = computed(() => !!token.value)

    // load user data from backend (if token exists)
    async function fetchUser() {
        if (!token.value) return
        const res = await fetch('http://localhost:3000/api/me', {
            headers: { 'X-User-Id': token.value || '' },
        })
        if (res.ok) {
            user.value = await res.json()
        } else {
            logout()
        }
    }

    async function login(email: string, password: string) {
        logout();
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        if (!res.ok) throw new Error('Login failed')

        const data = await res.json()
        token.value = data

        router.replace({ path: '/' })
    }

    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
    }

    return { user, token, isAuthenticated, login, logout, fetchUser }
})
