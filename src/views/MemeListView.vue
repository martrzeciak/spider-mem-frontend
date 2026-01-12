<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemesStore } from '@/stores/memes.store'
import MemeCard from '@/components/memes/MemeCard.vue'
import Pagination from '@/components/shared/Pagination.vue'

const store = useMemesStore()

onMounted(() => {
  store.fetchMemes()
})
</script>

<template>
  <div>
    <div v-for="meme in store.memes" key="meme.id">
      <MemeCard :meme="meme" />
    </div>

    <Pagination v-if="store.totalPages > 1" />
  </div>
</template>

