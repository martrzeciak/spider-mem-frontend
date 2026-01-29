import { defineStore } from 'pinia'
import axios from 'axios'
import type { Meme } from '@/models/meme'

const API_MEMES = 'https://localhost:5001/api/Meme'

export const useMemesStore = defineStore('memes', {
  state: () => ({
    // lista memów (strona główna)
    memes: [] as Meme[],

    // aktualnie otwarty mem (detail)
    selectedMeme: null as Meme | null,

    page: 1,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // =========================
    // POBIERANIE LISTY MEMÓW
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
      } catch (e) {
        this.error = 'Nie udało się pobrać memów'
      } finally {
        this.loading = false
      }
    },

    // =========================
    // POBIERANIE JEDNEGO MEMA
    // =========================
    async fetchMemeById(id: string) {
      this.loading = true
      this.error = null

      try {
        const res = await axios.get<Meme>(`${API_MEMES}/${id}`)
        this.selectedMeme = res.data
      } catch (e) {
        this.error = 'Nie udało się pobrać mema'
      } finally {
        this.loading = false
      }
    },

    // =========================
    // LIKE MEMA
    // =========================
    async likeMeme(id: string) {
      try {
        await axios.post(`${API_MEMES}/${id}/like`)

        // optymistyczny update 
        if (this.selectedMeme && this.selectedMeme.id === id) {
          this.selectedMeme.likeCount++
        }
      } catch {
        this.error = 'Nie udało się dodać lajka'
      }
    },

    // =========================
    // DODANIE KOMENTARZA
    // =========================
    async addComment(memeId: string, content: string) {
      try {
        const res = await axios.post(
          `${API_MEMES}/${memeId}/comment`,
          { content }
        )

        if (this.selectedMeme) {
          this.selectedMeme.comments.unshift(res.data)
        }
      } catch {
        this.error = 'Nie udało się dodać komentarza'
      }
    },

    // =========================
    // CZYSZCZENIE DETAILU
    // (np. przy wyjściu z widoku)
    // =========================
    clearSelectedMeme() {
      this.selectedMeme = null
    }
  }
})