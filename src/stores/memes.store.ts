import { defineStore } from 'pinia'
import axios from 'axios'
import type { Meme } from '@/models/meme'

const API_MEMES = 'https://localhost:5001/api/Meme'

export const useMemesStore = defineStore('memes', {
  state: () => ({
    memes: [] as Meme[],
    page: 1,
    loading: false,
    error: null as string | null,
  }),

  actions: {
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
    }
  }
})
