import { defineStore } from 'pinia'
import axios from 'axios'
import type { Meme } from '@/models/meme'
import { useAuthStore } from '@/stores/auth.store'

const API_MEMES = 'https://localhost:5001/api/Meme'
const API_COMMENTS = 'https://localhost:5001/api/Comment'

export const useMemesStore = defineStore('memes', {
  state: () => ({
    memes: [] as Meme[],
    selectedMeme: null as Meme | null,
    page: 1,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // =========================
    // LISTA MEMÓW
    // =========================
    async fetchMemes(page = 1) {
      this.loading = true
      this.error = null

      try {
        const res = await axios.get<Meme[]>(API_MEMES, {
          params: { page }
        })
        this.memes = res.data
        this.page = page
      } catch {
        this.error = 'Nie udało się pobrać memów'
      } finally {
        this.loading = false
      }
    },

    // =========================
    // JEDEN MEM (DETAIL)
    // =========================
    async fetchMemeById(id: string) {
      this.loading = true
      this.error = null

      try {
        const res = await axios.get<Meme>(`${API_MEMES}/${id}`)

        this.selectedMeme = {
          ...res.data,
          comments: res.data.comments ?? [],
          tags: res.data.tags ?? []
        }
      } catch {
        this.error = 'Nie udało się pobrać mema'
      } finally {
        this.loading = false
      }
    },

    // =========================
    // LIKE (opcjonalnie też można zabezpieczyć tokenem)
    // =========================
    async likeMeme(id: string) {
      try {
        await axios.post(`${API_MEMES}/${id}/like`)

        if (this.selectedMeme?.id === id) {
          this.selectedMeme.likeCount++
        }
      } catch {
        this.error = 'Nie udało się dodać lajka'
      }
    },

    // =========================
    // DODANIE KOMENTARZA (Z TOKENEM)
    // =========================
    async addComment(memeId: string, content: string) {
      const authStore = useAuthStore()

      if (!authStore.token) {
        this.error = 'Musisz być zalogowany'
        return
      }

      try {
        const res = await axios.post(
          API_COMMENTS,
          {
            memeId,
            content
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        )

        if (this.selectedMeme) {
          this.selectedMeme.comments.unshift(res.data)
        }
      } catch {
        this.error = 'Nie udało się dodać komentarza'
      }
    },

    // =========================
    // CLEANUP
    // =========================
    clearSelectedMeme() {
      this.selectedMeme = null
    }
  }
})