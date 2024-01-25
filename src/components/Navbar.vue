<template>
    <header class="backdrop-blur-sm py-5 border-b border-gray-200 -mb-px">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div class="flex justify-between content-center">
                <router-link to="/">
                    <div class="text-xl font-bold">
                        Book Apps
                    </div>
                </router-link>    
                <button class="flex justify-center rounded-md px-3 text-sm font-semibold leading-6 border " @click="logout()" v-if="store.user.uid">Logout</button>
                <a class="flex justify-center rounded-md bg-indigo-600 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 " href="/login" v-else>Login</a>
            </div>
        </div>
    </header>
</template>
<script setup>
import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()
store.init()

async function logout() {
    console.log('logout')
    await store.logout()
}
</script>

<style lang="scss" scoped>

</style>