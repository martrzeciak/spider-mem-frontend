<script setup lang="ts">
import type { Meme } from '@/models/meme'

defineProps<{
  meme: Meme
}>()
</script>

<template>
  <div class="meme-card">
    <img
      :src="meme.imageUrl"
      alt="meme"
      class="meme-image"
    />

    <h3>{{ meme.title }}</h3>

    <p class="meta">
      Dodane przez: <strong>{{ meme.userName }}</strong>
    </p>

    <p class="likes">
      Like {{ meme.likeCount }}
    </p>
  </div>
</template>

<style scoped>
.meme-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
}

.meme-image {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.meta {
  font-size: 0.9rem;
  color: #666;
}

.likes {
  margin-top: 6px;
  font-weight: bold;
}
</style>
