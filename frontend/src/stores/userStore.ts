import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSocket } from '../socket'
import { useAuthStore } from '../stores/auth.ts'
import type { User } from '../type/User.ts'

export const useUserStore = defineStore('users', () => {
    const users = ref<User[]>([]);
    const partners = computed(() => users.value.filter(u => u.role === 'partner'));

    const auth = useAuthStore();

    // Fetch all users from backend
    async function initUsers(): Promise<void> {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                headers: { 'X-User-Id': auth.token || '' },
            });
            if (res.ok) {
                const response = await res.json();
                if (response.result === true && response.data) {
                    users.value = response.data;
                }
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('initTickets', error);
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

    // Create a new user
    async function saveUser(user: User): Promise<void> {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-User-Id': auth.token || '' },
                body: JSON.stringify(user),
            })
            if (res.ok) {
                const response = await res.json();
                if (response.result === true && response.data) {
                    _addUser(response.data);
                }
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('initTickets', error);
        }
    }

    // Update an existing user
    async function updateUser(id: string, update: Partial<User>): Promise<void> {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-User-Id': auth.token || '' },
                body: JSON.stringify(update),
            });
            if (res.ok) {
                const response = await res.json();
                if (response.result === true && response.data) {
                    _updateUser(response.data);
                }
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('initTickets', error);
        }
    }

    // Perform user action
    async function userAction(id: string, actionKey: string): Promise<void> {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}/actions`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-User-Id': auth.token || '' },
                body: JSON.stringify({ actionKey: actionKey }),
            });
            if (res.ok) {
                const response = await res.json();
                if (response.result === true && response.data) {
                    _updateUser(response.data);
                }
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('initTickets', error);
        }
    }

    // Delete a user
    async function deleteUser(id: string): Promise<void> {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'X-User-Id': auth.token || '' },
            });
            if (res.ok) {
                users.value = users.value.filter(t => t.id !== id)
            } else {
                if (res.status === 404) throw new Error('404, Not found');
                if (res.status === 500) throw new Error('500, internal server error');
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('initTickets', error);
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

    return { users, partners, initUsers, getUser, getUserName, saveUser, updateUser, userAction, deleteUser, initSocketListeners }
})
