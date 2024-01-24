<template>
    <dialog id="my_modal_3" class="modal" :open=store.modal.addBook>
    <div class="modal-box space-y-6">
        <h3 class="font-bold text-lg">Input Buku</h3>
        <div class="space-y-6" >
            <div>
                <div class="mt-2 space-y-2">
                    <input type="text" placeholder="Masukkan judul" class="input input-sm input-bordered w-full" v-model="bookData.title"/>
                    <input type="text" placeholder="Masukkan deskripsi" class="input input-sm input-bordered w-full" v-model="bookData.description"/>
                    <input type="text" placeholder="Masukkan url cover" class="input input-sm input-bordered w-full" v-model="bookData.image"/>
                    <input type="number" placeholder="Masukkan tahun terbit" class="input input-sm input-bordered w-full" v-model="bookData.release_year"/>
                    <input type="text" placeholder="Masukkan harga" class="input input-sm input-bordered w-full" v-model="bookData.price"/>
                    <input type="text" placeholder="Masukkan total halaman" class="input input-sm input-bordered w-full" v-model="bookData.total_page"/>
                    <select class="select select-bordered select-sm w-full " v-model="bookData.category_id">
                        <option disabled selected>Pilih kategori</option>
                        <option v-for="category in store.categoryData" >{{ category.name }}</option>
                    </select>
                </div>
            </div>

            <div>
                <button class="btn btn-primary btn-sm flex w-full no-animation" @click="submit" loading>
                    <span class="loading loading-spinner" v-if="isLoading"></span>
                    Tambah
                </button>
            </div>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button @click="store.modal.addBook = false">Close</button>
    </form>
    </dialog>
</template>

<script setup>

import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

const bookData = ref({
    title: '',
    description: '',
    image: '',
    release_year: '',
    price: '',
    total_page: '',
    category_id: 'Pilih kategori',
})
const isLoading = ref()

async function submit() {
    isLoading.value = true
    // Get TOKEN for server to validate login
    const idToken = await store.refreshToken()
    if(!idToken){
        isLoading.value = false
        return
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("token", idToken);
    urlencoded.append("categoryName", categoryName.value);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const response = await fetch("http://localhost:5000/categories", requestOptions)
    isLoading.value = false

    console.log(response.status, await response.text())
    // Fetch to update recent data
    await store.fetchCategory()

    categoryName.value = ''

    return response.status 
}
// const data = {
//     // user input
//     title: bookData.title,
//     description: bookData.description,
//     image: bookData.image,
//     release_year: bookData.releaseYear,
//     price: bookData.price,
//     total_page: bookData.totalPage,
//     category_id: bookData.categoryID,
//     // system input
//     id: bookID,
//     thickness: getThickness(bookData.totalPage),
//     created_at: FieldValue.serverTimestamp(),
//     updated_at: FieldValue.serverTimestamp(),
//   }
</script>

<style lang="scss" scoped>

</style>