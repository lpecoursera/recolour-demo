// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useTicketStore } from '../stores/ticketStore'
import { useUserStore } from '../stores/userStore'

import type { User } from '../type/User'

import { connectSocket, disconnectSocket } from '../socket'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import TicketListLayout from '../layouts/TicketListLayout.vue'
import TicketQueueLayout from '../layouts/TicketQueueLayout.vue'

import LoginView from '../views/LoginView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import TicketQueue from '../views/TicketQueue.vue'
import ApprovedTickets from '../views/ApprovedTickets.vue'
import UserListView from '../views/UserListView.vue'
import PartnerOverview from '../views/PartnerOverview.vue'

const routes = [{
    path: '/',
    component: AppLayout,
    redirect: '/queue/open',
    children: [{
        path: 'queue',
        component: TicketQueueLayout,
        children: [
            {
                path: 'open',
                name: 'open',
                component: TicketQueue,
                meta: { title: 'Ticket Queue' }
            }
        ],
    }, {
        path: 'tickets',
        component: TicketListLayout,
        children: [
            {
                path: 'approved',
                name: 'approved',
                component: ApprovedTickets,
                meta: { title: 'Approved Tickets' }
            },
        ]
    },
    {
        path: 'users',
        name: 'users',
        component: UserListView,
        meta: { title: 'Users' }
    },
    {
        path: 'partners',
        name: 'partners',
        component: PartnerOverview,
        meta: { title: 'Partners' }
    },
    {
        path: 'user',
        name: 'user',
        component: UserProfileView,
        meta: { title: 'User Profile' }
    }],
},
{
    path: '/auth',
    component: AuthLayout,
    children: [
        {
            path: 'login',
            name: 'login',
            component: LoginView,
            meta: { title: 'Login' }
        }
    ]
}]

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to) => {
    const auth = useAuthStore();
    const userStore = useUserStore();
    const ticketStore = useTicketStore();

    // if navigating to any page except login and not logged in → redirect to login
    if (to.path !== '/auth/login' && !auth.isAuthenticated) {
        disconnectSocket();
        return '/auth/login';
    }

    // if logged in and going to login page → redirect to home
    if (to.path === '/login' && auth.isAuthenticated) {
        return '/';
    }

    // optionally, ensure user data is loaded
    if (auth.isAuthenticated && !auth.user) {
        await auth.fetchUser();

        if (auth.user) {
            const user: User = auth.user;
            connectSocket(user.id);
            userStore.initSocketListeners()
            ticketStore.initSocketListeners()
        }
        await userStore.initUsers()
        await ticketStore.initTickets()
        return '/'
    }
})
export default router
