<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import axios from 'axios'

const auth = useAuthStore()

const title = ref('')
const tags = ref<string[]>([])
const newTag = ref('')
const imageFile = ref<File | null>(null)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const API_MEME = 'https://localhost:5001/api/Meme/create'
const API_TAG = 'https://localhost:5001/api/Tag'

// Funkcja do bezpiecznego ustawiania pliku
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  imageFile.value = target.files?.[0] ?? null
}

// Dodawanie taga
const addTag = async () => {
  if (!newTag.value) return
  try {
    await axios.post(API_TAG, { name: newTag.value }, {
      headers: { Authorization: `Bearer ${auth.token}` }
    })
    tags.value.push(newTag.value)
    newTag.value = ''
    error.value = null
  } catch {
    error.value = 'Nie udało się dodać taga'
  }
}

// Dodawanie mema
const submit = async () => {
  if (!imageFile.value) {
    error.value = 'Wybierz plik!'
    return
  }

  const formData = new FormData()
  formData.append('Title', title.value)
  formData.append('ImageUrl', imageFile.value)
  tags.value.forEach(t => formData.append('Tags1', t))

  try {
    await axios.post(API_MEME, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`
      }
    })
    success.value = 'Meme dodany!'
    error.value = null
    title.value = ''
    tags.value = []
    imageFile.value = null
  } catch {
    error.value = 'Nie udało się dodać mema'
    success.value = null
  }
}
</script>

<template>
  <div class="add-meme">
    <h3>Dodaj mema</h3>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>

    <input v-model="title" placeholder="Tytuł" />

    <!-- Poprawione ustawienie pliku -->
    <input type="file" @change="handleFileChange" />

    <div class="tags">
      <input v-model="newTag" placeholder="Dodaj tag" />
      <button type="button" @click="addTag">Dodaj tag</button>
    </div>

    <div class="tags-list">
      <span v-for="t in tags" :key="t">{{ t }}</span>
    </div>

    <button @click="submit">Dodaj mema</button>
  </div>
</template>

<style scoped>
.add-meme {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tags-list span {
  display: inline-block;
  background: #eee;
  padding: 2px 6px;
  margin: 2px;
  border-radius: 4px;
}

.error { color: red }
.success { color: green }
</style>
