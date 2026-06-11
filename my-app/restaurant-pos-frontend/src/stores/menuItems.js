import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useMenuItemStore = defineStore('menuItem', {
    state: () => ({
        menuItems: [],
        loading: false,
    }),

    actions: {
        async fetchMenuItems() {
            this.loading = true
            try {
                const response = await axios.get('/menu-items')
                this.menuItems = response.data
            } finally {
                this.loading = false
            }
        },

        async createMenuItem(data) {
            const formData = new FormData()
            for (const key in data) {
                if (data[key] !== null && data[key] !== '') {
                    formData.append(key, data[key])
                }
            }
            const response = await axios.post('/menu-items', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            this.menuItems.push(response.data)
        },
        
        async updateMenuItem(id, data) {
            const formData = new FormData()
            for (const key in data) {
                if (data[key] !== null) formData.append(key, data[key])
            }
            formData.append('_method', 'PUT')
            const response = await axios.post(`/menu-items/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            const index = this.menuItems.findIndex(m => m.id === id)
            if (index !== -1) this.menuItems[index] = response.data
        },

        async deleteMenuItem(id) {
            await axios.delete(`/menu-items/${id}`)
            this.menuItems = this.menuItems.filter(m => m.id !== id)
        },

        async toggleAvailability(id) {
            const response = await axios.patch(`/menu-items/${id}/toggle`)
            const index = this.menuItems.findIndex(m => m.id === id)
            if (index !== -1) this.menuItems[index] = response.data
        }
    }
})