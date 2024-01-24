<template>
    <input type="checkbox" id="del_category_modal" class="modal-toggle" />
    <div class="modal" role="dialog">
      <div class="modal-box">
        <h3 class="font-bold ">Anda yakin menghapus kategori: {{ store.categoryToEdit.name }} ?</h3>
        <p>ID: {{ store.categoryToEdit.id }}</p>
        <div class="modal-action">
            <label for="del_category_modal" class="btn btn-error text-white btn-sm flex w-full no-animation" @click="submit">Yakin</label>
        </div>
      </div>
      <label class="modal-backdrop" for="del_category_modal" @click="resetInput()">Close</label>
    
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
    
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        const response = await fetch(`http://localhost:5000/categories/${store.categoryToEdit.id}`, requestOptions)
    
        console.log(response.status, await response.text())
        
        // Fetch to update recent data
        await store.fetchCategory()
    
        return response.status 
    }
    
    function resetInput(){
        categoryName.value=''
    }
    
    </script>
    
    <style lang="scss" scoped>
    
    </style>