<script setup lang="ts">
import type { Comment } from '@/models/comment'

defineProps<{ comment: Comment }>()
</script>

<template>
  <div class="comment">
    <p><strong>{{ comment.userName }}</strong>: {{ comment.content }}</p>
    <small>{{ new Date(comment.createdAt).toLocaleString() }}</small>
  </div>
</template>

<style scoped>
.comment {
  border-top: 1px solid #ddd;
  padding: 8px 0;
}
</style>
