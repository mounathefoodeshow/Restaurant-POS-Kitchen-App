import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
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
        },

        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('token')
        }
    }
})

