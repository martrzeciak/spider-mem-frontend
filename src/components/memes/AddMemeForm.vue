<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import axios from 'axios'
import type { Tag } from '@/models/tag'

const auth = useAuthStore()

const title = ref('')
const tags = ref<Tag[]>([])
const newTag = ref('')
const imageFile = ref<File | null>(null)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const API_MEME = 'https://localhost:5001/api/Meme/create'
const API_TAG = 'https://localhost:5001/api/Tag'

// Obsługa wyboru pliku
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  imageFile.value = target.files?.[0] ?? null
}

// Dodawanie nowego taga do backendu
const addTag = async () => {
  if (!newTag.value?.trim()) return

  // blokada duplikatów po nazwie
  if (tags.value.some(t => t.name === newTag.value.trim())) {
    newTag.value = ''
    return
  }

  try {
    const res = await axios.post(
      API_TAG,
      { name: newTag.value.trim() },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    // backend zwraca { id, name }
    const tag: Tag = { id: res.data.id, name: res.data.name }
    tags.value.push(tag)

    newTag.value = ''
    error.value = null
  } catch (err) {
    console.error(err)
    error.value = 'Nie udało się dodać taga'
  }
}

// Dodawanie mema z tagami
const submit = async () => {
  if (!imageFile.value) {
    error.value = 'Wybierz plik!'
    return
  }

  try {
    const formData = new FormData()
    formData.append('Title', title.value)
    formData.append('ImageUrl', imageFile.value)

    // dodajemy id wszystkich tagów w polu Tags1
    tags.value.forEach(t => formData.append('Tags1', t.id))

    await axios.post(API_MEME, formData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    success.value = 'Meme dodany!'
    error.value = null
    title.value = ''
    imageFile.value = null
    tags.value = []
  } catch (err) {
    console.error(err)
    error.value = 'Nie udało się dodać mema'
  }
}
</script>

<template>
  <div class="add-meme">
    <h3>Dodaj mema</h3>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>

    <input v-model="title" placeholder="Tytuł" />

    <input type="file" @change="handleFileChange" />

    <div class="tags">
      <input v-model="newTag" placeholder="Dodaj tag" />
      <button type="button" @click="addTag">Dodaj tag</button>
    </div>

    <div class="tags-list">
      <span v-for="tag in tags" :key="tag.id">
        {{ tag.name }}
      </span>
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