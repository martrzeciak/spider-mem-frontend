<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMemesStore } from '@/stores/memes.store'

const route = useRoute()
const store = useMemesStore()

onMounted(() => {
  store.fetchMemeById(route.params.id as string)
})

onUnmounted(() => {
  store.clearSelectedMeme()
})
</script>

<template>
  <div class="meme-detail">
    <p v-if="store.loading">Ładowanie mema...</p>
    <p v-else-if="store.error">{{ store.error }}</p>

    <article v-else-if="store.selectedMeme" class="post">
      <!-- OBRAZ -->
      <img
        :src="store.selectedMeme.imageUrl"
        class="post-image"
      />

      <!-- META -->
      <header class="post-meta">
        <strong>{{ store.selectedMeme.userName }}</strong>
      </header>

      <!-- LIKE -->
      <div class="post-actions">
        <button @click="store.likeMeme(store.selectedMeme.id)">
          👍 {{ store.selectedMeme.likeCount }}
        </button>
      </div>

      <!-- ⬇️ TU W PRZYSZŁOŚCI -->
      <!-- komentarze -->
      <!-- tagi -->
      <!-- formularz -->
    </article>
  </div>
</template>

<style scoped>
.meme-detail {
  width: 100%;
}

.post {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
}

.post-image {
  width: 100%;
  display: block;
  margin-bottom: 12px;
}

.post-meta {
  color: #666;
  margin-bottom: 8px;
}

.post-actions {
  margin-top: 8px;
}
</style>
