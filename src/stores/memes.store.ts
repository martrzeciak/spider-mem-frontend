import { defineStore } from 'pinia'
import type { Meme } from '@/models/meme'
import { getMemesMock } from '@/mocks/memes.mock'

export const useMemesStore = defineStore('memes', {
  state: () => ({
    memes: [] as Meme[],
    currentPage: 1,
    pageSize: 12,
    totalPages: 0,
    totalCount: 0,
    loading: false
  }),

  actions: {
    async fetchMemes(page = 1) {
      this.loading = true

      const data = await getMemesMock(page, this.pageSize)

      this.memes = data.items
      this.currentPage = data.currentPage
      this.totalPages = data.totalPages
      this.totalCount = data.totalCount

      this.loading = false
    },

    setPage(page: number) {
      this.fetchMemes(page)
    }
  }
})
