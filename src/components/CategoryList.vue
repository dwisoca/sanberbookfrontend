<template>
<ul role="list" class="divide-y divide-gray-100 ">
  <AddCategory/>
  <EditCategory/>
  <DeleteCategory/>
  <p class="font-bold text-lg">List Category</p>
  <li v-for="category in store.categoryData" :key="category.email" class="flex justify-between gap-x-6 py-2">
    <div class="flex min-w-0 gap-x-4">
      <div class="min-w-0 flex-auto space-y-1">
        <p class="text-sm font-semibold  text-gray-900 capitalize ">Name: {{ category.name }}</p>
        <p class="truncate text-xs text-gray-500">ID: {{ category.id }}</p>
        <label for="my_modal_6" class="btn btn-xs btn-outline" @click="updateCategoryToEdit(category)">Edit</label>
        <label for="del_category_modal" class="btn btn-xs btn-outline btn-error ml-1" @click="updateCategoryToEdit(category)">Hapus</label>
        <br>
        <button class="btn btn-xs btn-outline btn-primary mt-1" @click="store.fetchBook(category.id)">Tampilkan buku</button>
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