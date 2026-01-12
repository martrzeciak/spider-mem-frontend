<template>
  <v-pagination
    v-model="page"
    :length="totalPages"
    @update:model-value="setPage"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMemesStore } from '@/stores/memes.store'

const store = useMemesStore()

const page = computed({
  get: () => store.currentPage,
  set: (value: number) => store.setPage(value)
})

const totalPages = computed(() => store.totalPages)

const setPage = (page: number) => {
  store.setPage(page)
}
</script>
