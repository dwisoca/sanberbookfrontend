
<template>
  <header class="sticky top-0 z-50">
    <Navbar/>
  </header>
  <main class="m-8">
    <p class="text-3xl font-bold">Dashboard</p>
    <div class="mt-2 flex gap-2">
      <button class="btn btn-sm btn-outline" @click="store.modal.addCategory = true">New Category</button>
      <button class="btn btn-sm btn-outline" @click="store.modal.addBook = true">New Book</button>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <CategoryList/>
      <BookList/>
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
