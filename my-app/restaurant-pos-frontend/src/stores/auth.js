import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import router from '../router/index.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        token: localStorage.getItem('token') || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(email, password) {
            const response = await axios.post('/login', { email, password })

            this.token = response.data.token
            this.user = response.data.user

            localStorage.setItem('token', this.token)
            localStorage.setItem('user', JSON.stringify(this.user))

            if (this.user.role === 'admin') {
                router.push('/dashboard')
            } else if (this.user.role === 'waiter') {
                router.push('/pos')
            } else if (this.user.role === 'kitchen') {
                router.push('/kitchen')
            }
        },

        async logout() {
            await axios.post('/logout')
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/login')
        }
    }
})