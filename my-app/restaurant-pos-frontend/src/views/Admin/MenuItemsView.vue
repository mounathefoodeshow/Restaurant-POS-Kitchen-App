<template>
    <div class="p-6">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Menu Items</h1>
            <button @click="openModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                + Ajouter
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="item in menuItemStore.menuItems" :key="item.id" class="bg-white rounded-xl shadow-sm p-4">
                <img v-if="item.image_url" :src="`http://localhost:8000/storage/${item.image_url}`"
                    class="w-full h-40 object-cover rounded-lg mb-3" />
                <div class="flex items-center justify-between mb-1">
                    <span class="font-medium text-gray-800">{{ item.name }}</span>
                    <span class="text-blue-600 font-bold">{{ item.price }} DH</span>
                </div>
                <p class="text-sm text-gray-400 mb-3">{{ item.description }}</p>
                <div class="flex items-center justify-between">
                    <span @click="menuItemStore.toggleAvailability(item.id)"
                        :class="item.is_available == 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'"
                        class="text-xs px-3 py-1 rounded-full cursor-pointer">
                        {{ item.is_available == 1 ? 'Disponible' : 'Indisponible' }}
                    </span>
                    <div class="flex gap-2">
                        <button @click="openModal(item)" class="text-blue-500 hover:text-blue-700 text-sm">
                            Modifier
                        </button>
                        <button @click="handleDelete(item.id)" class="text-red-500 hover:text-red-700 text-sm">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                <h2 class="text-lg font-bold mb-4">
                    {{ editing ? 'Modifier' : 'Ajouter' }} un item
                </h2>
                <div class="flex flex-col gap-4">
                    <select v-model="form.category_id"
                        class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Choisir une catégorie</option>
                        <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
                            {{ cat.name }}
                        </option>
                    </select>
                    <input v-model="form.name" type="text" placeholder="Nom"
                        class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea v-model="form.description" placeholder="Description"
                        class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    <input v-model="form.price" type="number" placeholder="Prix"
                        class="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="file" @change="handleImage" accept="image/*" class="text-sm text-gray-500" />
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
import { useMenuItemStore } from '../../stores/menuItems'
import { useCategoryStore } from '../../stores/category'

const menuItemStore = useMenuItemStore()
const categoryStore = useCategoryStore()

const showModal = ref(false)
const editing = ref(null)
const form = ref({
    category_id: '',
    name: '',
    description: '',
    price: '',
    image_url: null,
    is_available: 1
})

onMounted(() => {
    menuItemStore.fetchMenuItems()
    categoryStore.fetchCategories()
})

function openModal(item = null) {
    editing.value = item
    form.value.category_id = item?.category_id || ''
    form.value.name = item?.name || ''
    form.value.description = item?.description || ''
    form.value.price = item?.price || ''
    form.value.image = null
    showModal.value = true
}

function handleImage(e) {
    form.value.image_url = e.target.files[0]
}

async function handleSave() {
    if (editing.value) {
        await menuItemStore.updateMenuItem(editing.value.id, form.value)
    } else {
        await menuItemStore.createMenuItem(form.value)
    }
    showModal.value = false
}

async function handleDelete(id) {
    if (confirm('Supprimer cet item ?')) {
        await menuItemStore.deleteMenuItem(id)
    }
}
</script>