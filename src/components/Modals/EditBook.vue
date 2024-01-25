<template>
<input type="checkbox" id="edit_book_modal" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Edit Category ID: {{ store.bookToEdit.id }}</h3>
        <div class="space-y-6" >
            <div>
                <div class="mt-2 space-y-2">
                    <label class="text-xs">Judul</label>
                    <input type="text" placeholder="Masukkan judul" class="input input-sm input-bordered w-full" v-model="store.bookToEdit.title"/>
                    <label class="text-xs">Deskripsi</label>
                    <input type="text" placeholder="Masukkan deskripsi" class="input input-sm input-bordered w-full" v-model="store.bookToEdit.description"/>
                    <label class="text-xs">URL Image</label>
                    <input type="text" placeholder="Masukkan url cover" class="input input-sm input-bordered w-full" v-model="store.bookToEdit.image"/>
                    <label class="text-xs">Tahun Terbit</label>
                    <input type="number" placeholder="Masukkan tahun terbit" class="input input-sm input-bordered w-full" v-model="store.bookToEdit.release_year"/>
                    <p class="ml-1 text-xs italic text-red-400" v-if="!isValidYear">*Tahun terbit dibatasi 1980 - 2021</p>
                    <label class="text-xs">Harga</label>
                    <input type="text" placeholder="Masukkan harga" class="input input-sm input-bordered w-full" v-model="store.bookToEdit.price"/>
                    <label class="text-xs">Jumlah Halaman</label>
                    <input type="number" placeholder="Masukkan total halaman" class="input input-sm input-bordered w-full" v-model="store.bookToEdit.total_page"/>
                    <label class="text-xs">Kategori</label>
                    <select class="select select-bordered select-sm w-full " v-model="store.bookToEdit.category_id">
                        <option disabled selected>Pilih kategori</option>
                        <option v-for="category in store.categoryData" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
            </div>
        </div>
    <div class="modal-action">
        <label for="edit_book_modal" class="btn btn-primary btn-sm flex w-full no-animation" @click="submit">Simpan</label>
    </div>
  </div>
  <label class="modal-backdrop" for="edit_book_modal" @click="resetInput()">Close</label>

</div>
</template>

<script setup>

import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

const isLoading = ref()

const isValidYear = computed(()=>{
    const minYear = 1980;
    const maxYear = 2021;

    if (Number.isInteger(store.bookToEdit.release_year) && store.bookToEdit.release_year >= minYear && store.bookToEdit.release_year <= maxYear) {
        return true; 
    } else {
        return false; 
    }
})

async function submit() {
    if (!isValidYear.value){
        alert('Tahun terbit tidak sesuai')
        return
    }
    if (store.bookToEdit.category_id == 'Pilih kategori' || store.bookToEdit.category_id == ''){
        alert('Category belum dipilih')
        return
    }
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
    urlencoded.append("bookData", JSON.stringify(store.bookToEdit));

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const response = await fetch(`http://localhost:5000/books/${store.bookToEdit.id}`, requestOptions)
    isLoading.value = false

    console.log(response.status, await response.text())
    // Fetch to update recent data
    // await store.fetchBook()

    resetInput()

    return response.status 
}

function resetInput(){
    store.bookToEdit = {
        title: '',
        description: '',
        image: '',
        releaseYear: '',
        price: '',
        totalPage: '',
        categoryID: 'Pilih kategori',
    }
}

</script>

<style lang="scss" scoped>

</style>