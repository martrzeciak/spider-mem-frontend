<script setup lang="ts">
import type { Meme } from '@/models/meme'
import { RouterLink } from 'vue-router'

defineProps<{
  meme: Meme
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'mem-details', params: { id: meme.id } }"
    class="meme-card"
  >
    <img :src="meme.imageUrl" class="meme-image" />

    <h3>{{ meme.title }}</h3>

    <p class="meta">
      Dodane przez <strong>{{ meme.userName }}</strong>
    </p>

    <p class="likes">👍 {{ meme.likeCount }}</p>
  </RouterLink>
</template>

<style scoped>
.meme-card {
  display: block;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.meme-card:hover {
  background: #f7f7f7;
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
