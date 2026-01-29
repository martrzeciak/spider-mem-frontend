<script setup lang="ts">
import { onMounted } from 'vue'
import { useMemesStore } from '@/stores/memes.store'
import { useAuthStore } from '@/stores/auth.store'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import AddMemeForm from '@/components/memes/AddMemeForm.vue'
import { RouterLink } from 'vue-router'

const auth = useAuthStore()
const store = useMemesStore()

onMounted(() => {
  store.fetchTags()
})
</script>

<template>
  <div class="sidebar">
    <LoginForm v-if="auth.showLoginForm && !auth.isAuthenticated" />
    <RegisterForm v-if="auth.showRegisterForm && !auth.isAuthenticated" />

    <AddMemeForm v-if="auth.isAuthenticated" />

    <div class="tags-block">
      <h3>Tagi</h3>

      <p v-if="store.loading">Ładowanie tagów...</p>
      <p v-if="store.error" style="color: red">{{ store.error }}</p>

      <div v-if="store.tags.length">
        <RouterLink
          v-for="tag in store.tags"
          :key="tag.id"
          :to="{ name: 'tag', params: { tagId: tag.id } }"
          class="tag"
        >
          #{{ tag.name }}
        </RouterLink>
      </div>

      <p v-else-if="!store.loading && !store.error">Brak tagów</p>
    </div>
  </div>
</template>