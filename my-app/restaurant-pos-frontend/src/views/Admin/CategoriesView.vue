<template>
    <div class="p-6">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Catégories</h1>
            <button @click="openModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                + Ajouter
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="cat in categoryStore.categories" :key="cat.id"
                class="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <div class="w-4 h-4 rounded-full" :style="{ background: cat.color || '#ccc' }"></div>
                    <span class="font-medium text-gray-800">{{ cat.name }}</span>
                </div>
                <div class="flex gap-2">
                    <button @click="openModal(cat)" class="text-blue-500 hover:text-blue-700 text-sm">
                        Modifier
                    </button>
                    <button @click="handleDelete(cat.id)" class="text-red-500 hover:text-red-700 text-sm">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                <h2 class="text-lg font-bold mb-4">
                    {{ editing ? 'Modifier' : 'Ajouter' }} une catégorie
                </h2>
                <div class="flex flex-col gap-4">
                    <input v-model="form.name" type="text" placeholder="Nom de la catégorie"
                        class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input v-model="form.color" type="color"
                        class="w-full h-10 rounded-lg border border-gray-200 cursor-pointer" />
                    <div class="flex gap-3 justify-end">
                        <button @click="showModal = false" class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
                            Annuler
                        </button>
                        <button @click="handleSave"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                            Sauvegarder
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '../../stores/category'

const categoryStore = useCategoryStore()

const showModal = ref(false)
const editing = ref(null)
const form = ref({ name: '', color: '#000000' })

onMounted(() => categoryStore.fetchCategories())

function openModal(cat = null) {
    editing.value = cat
    form.value.name = cat?.name || ''
    form.value.color = cat?.color || '#000000'
    showModal.value = true
}

async function handleSave() {
    if (editing.value) {
        await categoryStore.updateCategory(editing.value.id, form.value)
    } else {
        await categoryStore.createCategory(form.value)
    }
    showModal.value = false
}

async function handleDelete(id) {
    if (confirm('Supprimer cette catégorie ?')) {
        await categoryStore.deleteCategory(id)
    }
}
</script>