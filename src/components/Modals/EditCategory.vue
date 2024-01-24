<template>
<input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Edit Category ID: {{ store.categoryToEdit.id }}</h3>
        <div class="space-y-2" >
            <div>
                <div class="mt-2">
                    <input type="text" placeholder="Masukkan nama kategori yang baru" class="input input-sm input-bordered w-full" v-model="categoryName"/>
                </div>
            </div>
        </div>
    <div class="modal-action">
        <label for="my_modal_6" class="btn btn-primary btn-sm flex w-full no-animation" @click="submit">Simpan</label>
    </div>
  </div>
  <label class="modal-backdrop" for="my_modal_6" @click="resetInput()">Close</label>

</div>
</template>

<script setup>

import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

const categoryName = ref()

async function submit() {
    // Get TOKEN for server to validate login
    const idToken = await store.refreshToken()
    if(!idToken){
        return
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("token", idToken);
    urlencoded.append("categoryName", categoryName.value);

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    const response = await fetch(`http://localhost:5000/categories/${store.categoryToEdit.id}`, requestOptions)

    console.log(response.status, await response.text())
    
    // Fetch to update recent data
    await store.fetchCategory()
    
    categoryName.value=''

    return response.status 
}

function resetInput(){
    categoryName.value=''
}

</script>

<style lang="scss" scoped>

</style>