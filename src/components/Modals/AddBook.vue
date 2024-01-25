<template>
    <dialog id="my_modal_3" class="modal" :open=store.modal.addBook>
    <div class="modal-box space-y-6">
        <h3 class="font-bold text-lg">Input Buku</h3>
        <div class="space-y-6" >
            <div>
                <div class="mt-2 space-y-2">
                    <label class="text-xs">Judul</label>
                    <input type="text" placeholder="Masukkan judul" class="input input-sm input-bordered w-full" v-model="bookData.title"/>
                    <label class="text-xs">Deskripsi</label>
                    <input type="text" placeholder="Masukkan deskripsi" class="input input-sm input-bordered w-full" v-model="bookData.description"/>
                    <label class="text-xs">URL Image</label>
                    <input type="text" placeholder="Masukkan url cover" class="input input-sm input-bordered w-full" v-model="bookData.image"/>
                    <label class="text-xs">Tahun Terbit</label>
                    <input type="number" placeholder="Masukkan tahun terbit" class="input input-sm input-bordered w-full" v-model="bookData.release_year"/>
                    <p class="ml-1 text-xs italic text-red-400" v-if="!isValidYear">*Tahun terbit dibatasi 1980 - 2021</p>
                    <label class="text-xs">Harga</label>
                    <input type="text" placeholder="Masukkan harga" class="input input-sm input-bordered w-full" v-model="bookData.price"/>
                    <label class="text-xs">Jumlah Halaman</label>
                    <input type="number" placeholder="Masukkan total halaman" class="input input-sm input-bordered w-full" v-model="bookData.total_page"/>
                    <label class="text-xs">Kategori</label>
                    <select class="select select-bordered select-sm w-full " v-model="bookData.category_id">
                        <option disabled selected>Pilih kategori</option>
                        <option v-for="category in store.categoryData" :value="category.id">{{ category.name }}</option>
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

const isValidYear = computed(()=>{
    const minYear = 1980;
    const maxYear = 2021;

    if (Number.isInteger(bookData.value.release_year) && bookData.value.release_year >= minYear && bookData.value.release_year <= maxYear) {
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
    if (bookData.value.category_id == 'Pilih kategori' || bookData.value.category_id == ''){
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
    urlencoded.append("bookData", JSON.stringify(bookData.value));

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const response = await fetch("http://localhost:5000/books", requestOptions)
    isLoading.value = false

    console.log(response.status, await response.text())
    // Fetch to update recent data
    await store.fetchBook()

    bookData.value = {
        title: '',
        description: '',
        image: '',
        release_year: '',
        price: '',
        total_page: '',
        category_id: 'Pilih kategori',
    }

    return response.status 
}

</script>

<style lang="scss" scoped>

</style>