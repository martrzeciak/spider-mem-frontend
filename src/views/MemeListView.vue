<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemesStore } from '@/stores/memes.store'
import MemeCard from '@/components/memes/MemeCard.vue'

const store = useMemesStore()

onMounted(() => {
  store.fetchMemes(1)
})
</script>

<template>
  <div>
    <p v-if="store.loading">Ładowanie memów...</p>
    <p v-if="store.error">{{ store.error }}</p>

    <div v-for="meme in store.memes" :key="meme.id">
      <MemeCard :meme="meme" />
    </div>
  </div>
</template>
