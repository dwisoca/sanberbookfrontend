<template>
<ul role="list" class="divide-y divide-gray-100 col-span-2">
    <AddBook/>
    <div class="flex flex-col">
    <p class="mt-4">List Book</p>
    <p class="mt-2 text-sm italic text-red-400" v-if="store.bookData.length <= 0">Tidak ada buku ditemukan</p>
    </div>
    <li v-for="book in store.bookData" class="flex justify-between gap-x-6 py-2">
    <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">ID: {{ book.id }}</p>
        <p class="text-sm font-semibold leading-6 text-gray-900">Name: {{ book.name }}</p>
        <label for="my_modal_6" class="btn btn-xs btn-outline" @click="updateCategoryToEdit(book)">Edit</label>
        <label for="del_category_modal" class="btn btn-xs btn-outline btn-error ml-1" @click="updateCategoryToEdit(book)">Hapus</label>
        </div>
    </div>
    </li>
</ul>
</template>

<script setup>
import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

function updateCategoryToEdit(category){
store.categoryToEdit = category
}

</script>