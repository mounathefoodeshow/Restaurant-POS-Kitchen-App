import { defineStore } from 'pinia'
import axios from '../plugins/axios'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
        loading: false,
    }),

    actions: {
        async fetchCategories() {
            this.loading = true
            try {
                const response = await axios.get('/categories')
                this.categories = response.data
            } finally {
                this.loading = false
            }
        },

        async createCategory(data) {
            const response = await axios.post('/categories', data)
            this.categories.push(response.data)
        },

        async updateCategory(id, data) {
            const response = await axios.put(`/categories/${id}`, data)
            const index = this.categories.findIndex(c => c.id === id)
            if (index !== -1) this.categories[index] = response.data
        },

        async deleteCategory(id) {
            await axios.delete(`/categories/${id}`)
            this.categories = this.categories.filter(c => c.id !== id)
        }
    }
})