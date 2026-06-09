import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/AdminView.vue'),
        meta: { requiresAuth: true, role: 'admin' }
    },
    {
        path: '/pos',
        name: 'POS',
        component: () => import('../views/PosView.vue'),
        meta: { requiresAuth: true, role: 'waiter' }
    },
    {
        path: '/kitchen',
        name: 'Kitchen',
        component: () => import('../views/KitchenView.vue'),
        meta: { requiresAuth: true, role: 'kitchen' }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// this part i use itto check role and Auth 
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if (to.meta.requiresAuth && !token) {
        next('/login')
    } else if (to.meta.role && user?.role !== to.meta.role) {
        next('/login')
    } else {
        next()
    }
})

export default router