import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '../api/client.ts'
import { getSocket } from '../socket'
import type { User } from '../type/User.ts'

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([]);
    const partners = computed(() => users.value.filter(u => u.role === 'partner'));

    // Fetch all users from backend
    async function initUsers(): Promise<void> {
        try {
            const resultUsers = await apiFetch<User[]>('/users');
            if (resultUsers) {
                users.value = resultUsers;
            }
        } catch (error) {
            console.error('initUsers', error);
        }
    }

    // Get a single user
    function getUser(id?: string): User | undefined {
        if (!id) return
        return users.value.find(t => t.id === id)
    }

    // Get user name
    function getUserName(id?: string) {
        if (!id) return ""
        const user = users.value.find(u => u.id === id)
        return user?.name ?? ''
    }

    // Save a new user
    async function saveUser(user: User): Promise<void> {
        try {
            const resultUser = await apiFetch<User>('/users', {
                method: 'POST',
                body: JSON.stringify(user)
            });
            if (resultUser) {
                _addUser(resultUser);
            }
        } catch (error) {
            console.error('saveUser', error);
        }
    }

    // Update an existing user
    async function updateUser(id: string, partialUser: Partial<User>) {
        try {
            const resultUser = await apiFetch<User>(`/users/${id}`, {
                method: 'PUT',
                body: JSON.stringify(partialUser)
            });
            if (resultUser) {
                _updateUser(resultUser);;
            }
        } catch (error) {
            console.error('updateUser', error);
        }
    }

    function _addUser(user: User) {
        const existing = !!(users.value.find(t => t.id === user.id));
        if (!existing) users.value.push(user);
    }
    function _updateUser(updatedUser: User): void {
        const idx = users.value.findIndex(t => t.id === updatedUser.id);
        if (idx !== -1) users.value[idx] = updatedUser;
    }

    // Listen for socket emits
    function initSocketListeners() {
        try {
            const socket = getSocket();
            socket.on('user:create', (user: User) => {
                _addUser(user);
            });
            socket.on('user:update', (user: User) => {
                _updateUser(user);
            });
        } catch (err) {
            console.warn('Socket not ready yet, skipping user listener init');
        }
    }

    return { users, partners, initUsers, getUser, getUserName, saveUser, updateUser, initSocketListeners }
})
