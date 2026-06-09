<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white p-10 rounded-2xl shadow-md w-full max-w-sm">
            <h1 class="text-2xl font-bold text-gray-800 mb-1">Restaurant POS</h1>
            <p class="text-sm text-gray-400 mb-6">Connectez-vous à votre compte</p>

            <div v-if="error" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                {{ error }}
            </div>

            <div class="flex flex-col gap-4">
                <input v-model="email" type="email" placeholder="Email"
                    class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input v-model="password" type="password" placeholder="Mot de passe"
                    class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button @click="handleLogin" :disabled="loading"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ loading ? 'Connexion...' : 'Se connecter' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
    error.value = ''
    loading.value = true
    try {
        await authStore.login(email.value, password.value)
    } catch (e) {
        error.value = e.response?.data?.message || 'Erreur de connexion'
    } finally {
        loading.value = false
    }
}
</script>