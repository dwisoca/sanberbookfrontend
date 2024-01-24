<template>
    <!-- Open the modal using ID.showModal() method -->
    <dialog id="my_modal_1" class="modal" :open=store.modal.addCategory>
    <div class="modal-box space-y-6">
        <h3 class="font-bold text-lg">Buat Category</h3>
        <div class="space-y-6" >
            <div>
                <div class="mt-2">
                    <input type="text" placeholder="Masukkan nama kategori" class="input input-sm input-bordered w-full" v-model="categoryName"/>
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
        <button @click="store.modal.addCategory = false">Close</button>
    </form>
    </dialog>
</template>

<script setup>

import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

const categoryName = ref()
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

</script>

<style lang="scss" scoped>

</style>