<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white p-10 rounded-2xl shadow-md text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Kitchen Display</h1>
            <p class="text-gray-400 text-sm mb-6">Bienvenue Kitchen </p>
            <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm">
                Se déconnecter
            </button>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
async function handleLogout() {
    await authStore.logout()
}
</script>