
<template>
  <header class="sticky top-0 z-50">
    <Navbar/>
  </header>
  <main class="m-8">
    <p class="text-3xl font-bold">Dashboard</p>
    <div class="mt-2 flex gap-5">
      <button class="btn btn-sm btn-outline flex-none" @click="store.modal.addCategory = true">New Category</button>
      <div class="divider divider-horizontal flex-none"></div>
      <button class="btn btn-sm btn-outline -ml-1" @click="store.modal.addBook = true">New Book</button>
    </div>
    <div class="flex gap-4 py-4">
      <CategoryList class="flex-none"/>
      <div class="divider divider-horizontal flex-none"></div>
      <BookList class="grow"/>
    </div>
  </main>
</template>

<script setup>
import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()
onMounted(async ()=>{
  await store.fetchCategory()
  await store.fetchBook()
})
</script>
