<template>
    <div class="min-h-screen bg-gray-100 flex">
        <aside class="w-64 bg-white shadow-md flex flex-col">
            <div class="p-6 border-b">
                <h1 class="text-xl font-bold text-gray-800">Restaurant POS</h1>
                <p class="text-sm text-gray-400">Admin</p>
            </div>
            <nav class="flex-1 p-4 flex flex-col gap-2">
                <RouterLink to="/dashboard/categories"
                    class="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    active-class="bg-blue-50 text-blue-600">
                    Catégories
                </RouterLink>
                <RouterLink to="/dashboard/menu-items"
                    class="px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    active-class="bg-blue-50 text-blue-600">
                    Menu Items
                </RouterLink>
            </nav>
            <div class="p-4 border-t">
                <button @click="handleLogout"
                    class="w-full bg-red-50 hover:bg-red-100 text-red-500 px-4 py-2 rounded-lg text-sm">
                    Se déconnecter
                </button>
            </div>
        </aside>

        <main class="flex-1 overflow-y-auto">
            <RouterView />
        </main>

    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

async function handleLogout() {
    await authStore.logout()
}
</script>