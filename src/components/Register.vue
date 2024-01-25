
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <router-link to="/">
          <img class="mx-auto h-10 w-auto" src="/bookicon.png" alt="Your Company" />
        </router-link>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Daftar Akun Baru</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900" >Email</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" required="" placeholder="masukkan email" v-model="user.email" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <!-- <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> -->
              </div>
            </div>
            <div class="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" required="" placeholder="masukkan password" v-model="user.password" class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
  
          <div >
            <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="register()"
            >Daftar</button>
        </div>
      </div>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Sudah punya akun?
          {{ ' ' }}
          <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Masuk</a>
        </p>
      </div>
    </div>
  </template>

<script setup>
import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

const user = ref({
  email: '',
  password: ''
})

async function register() {
    await store.register(user.value)
}
</script>

<style lang="scss" scoped>

</style>