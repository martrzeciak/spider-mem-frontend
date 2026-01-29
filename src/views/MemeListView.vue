<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemesStore } from '@/stores/memes.store'
import MemeCard from '@/components/memes/MemeCard.vue'
import Pagination from '@/components/common/Pagination.vue'

const store = useMemesStore()

onMounted(() => {
  store.fetchMemes(1)
})
</script>

<template>
  <div class="meme-list">
    <p v-if="store.loading">Ładowanie memów...</p>
    <p v-if="store.error">{{ store.error }}</p>

    <div
      v-for="meme in store.memes"
      :key="meme.id"
      class="meme-item"
    >
      <MemeCard :meme="meme" />
    </div>
  </div>
  <Pagination
    v-if="store.totalPages > 1"
    :currentPage="store.currentPage"
    :totalPages="store.totalPages"
    @prev="store.prevPage"
    @next="store.nextPage"
  />
</template>