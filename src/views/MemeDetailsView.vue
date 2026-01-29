<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMemesStore } from '@/stores/memes.store'

const route = useRoute()
const store = useMemesStore()

const newComment = ref('')

const sortedComments = computed(() => {
  if (!store.selectedMeme) return []
  return [...store.selectedMeme.comments].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

const submitComment = async () => {
  if (!newComment.value.trim() || !store.selectedMeme) return
  await store.addComment(store.selectedMeme.id, newComment.value)
  newComment.value = ''
}

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

      <!-- HASHTAGI -->
      <div class="tags">
        <span
          v-for="tag in store.selectedMeme.tags"
          :key="tag.name"
          class="tag"
        >
          #{{ tag.name }}
        </span>
      </div>

      <!-- TYTUŁ -->
      <h1 class="post-title">
        {{ store.selectedMeme.title }}
      </h1>

      <!-- OBRAZ -->
      <img
        :src="store.selectedMeme.imageUrl"
        class="post-image"
      />

      <!-- USER + LIKE -->
      <div class="post-footer">
        <div class="post-author">
          {{ store.selectedMeme.userName }}
        </div>

        <button
          class="like-button"
          @click="store.likeMeme(store.selectedMeme.id)"
        >
          👍 {{ store.selectedMeme.likeCount }}
        </button>
      </div>

      <!-- FORMULARZ KOMENTARZA -->
      <form @submit.prevent="submitComment" class="comment-form">
        <input
          v-model="newComment"
          placeholder="Dodaj komentarz..."
        />
        <button type="submit">Wyślij</button>
      </form>

      <!-- KOMENTARZE -->
      <section class="comments">
        <h3>Komentarze</h3>

        <div v-if="sortedComments.length" class="comments-list">
          <div
            v-for="comment in sortedComments"
            :key="comment.id"
            class="comment-item"
          >
            <strong>{{ comment.userName }}</strong>
            <p class="comment-content">{{ comment.content }}</p>
            <small>
              {{ new Date(comment.createdAt).toLocaleString() }}
            </small>
          </div>
        </div>

        <p v-else>Brak komentarzy</p>
      </section>

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
  padding: 14px;
}

/* HASHTAGI */
.tags {
  margin-bottom: 6px;
}

.tag {
  background: #f1f1f1;
  padding: 3px 7px;
  border-radius: 4px;
  margin-right: 4px;
  font-size: 0.75em;
  color: #555;
}

/* TYTUŁ */
.post-title {
  margin: 0 0 12px 0;
  font-size: 1.6rem;
  font-weight: 700;
}

/* OBRAZ */
.post-image {
  width: 100%;
  margin-bottom: 10px;
}

/* FOOTER POD OBRAZEM */
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.post-author {
  font-size: 0.9rem;
  color: #666;
}

.like-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

/* KOMENTARZE */
.comments {
  margin-top: 16px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.comment-content {
  margin: 4px 0;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.4;
}

.comment-item small {
  color: #999;
  font-size: 0.75em;
}

/* FORMULARZ */
.comment-form {
  display: flex;
  gap: 8px;
  margin: 12px 0;
}

.comment-form input {
  flex: 1;
  padding: 6px;
}

.comment-form button {
  padding: 6px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
