<template>
<ul role="list" class="divide-y divide-gray-100 ">
    <AddBook/>
    <DeleteBook/>
    <EditBook/>
    <div class="flex flex-col">
    <p class="font-bold text-lg">List Book</p>
    <p class="mt-2 text-sm italic text-red-400" v-if="store.bookData.length <= 0">Tidak ada buku ditemukan</p>
    </div>
    <FilterBook/>
    <div class="overflow-x-auto">
        <table class="table table-xs">
            <!-- head -->
            <thead>
            <tr >
                <th>No.</th>
                <th>Judul</th>
                <th>Deskripsi</th>
                <th>Tahun Terbit</th>
                <th>Harga</th>
                <th>Total Halaman</th>
                <th>Category</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in store.bookData">
                    <td>{{ index+1 }}</td>
                    <td>
                        <div class="flex flex-col gap-2">
                            <label class="font-bold">{{ book.title }}</label>
                            <img :src="book.image" class="rounded-md max-h-10 max-w-40 object-cover"/>
                        </div>
                    </td>
                    <td>{{ book.description }}</td>
                    <td>{{ book.release_year }}</td>
                    <td>{{ book.price }}</td>
                    <td>{{ book.total_page }} ({{ book.thickness }})</td>
                    <td>{{ getNameById(store.categoryData, book.category_id) }}</td>
                    <td>
                        <div class="flex gap-1">
                            <label for="edit_book_modal" class="btn btn-xs btn-outline" @click="updateBookToEdit(book)">Edit</label>
                            <label for="del_book_modal" class="btn btn-xs btn-outline btn-error" @click="updateBookToEdit(book)">Hapus</label>
                        </div>
                    </td>
                </tr>
            </tbody>
            
        </table>
    </div>
</ul>
</template>

<script setup>
import { useMainStore } from '@/stores/indexStore.js'
const store = useMainStore()

function updateBookToEdit(book){
    store.bookToEdit = book
}

function getNameById(data, id) {
  for (const item of data) {
    if (item.id === id) {
      return item.name;
    }
  }
  return null;
}

</script>