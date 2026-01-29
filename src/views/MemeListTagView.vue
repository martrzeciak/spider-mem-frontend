<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMemesStore } from '@/stores/memes.store'
import MemeCard from '@/components/memes/MemeCard.vue'

const store = useMemesStore()
const route = useRoute()

const loadMemes = () => {
  const tagId = route.params.tagId as string | undefined

  if (tagId) {
    store.fetchMemesByTag(tagId, 1)
  } else {
    store.fetchMemes(1)
  }
}

onMounted(loadMemes)

watch(
  () => route.params.tagId,
  () => loadMemes()
)
</script>

<template>
  <div class="meme-list">
    <p v-if="store.loading">Ładowanie memów...</p>
    <p v-if="store.error">{{ store.error }}</p>

    <p v-if="!store.loading && store.memes.length === 0">
      Brak memów w tej kategorii
    </p>

    <div
      v-for="meme in store.memes"
      :key="meme.id"
      class="meme-item"
    >
      <MemeCard :meme="meme" />
    </div>
  </div>
</template>