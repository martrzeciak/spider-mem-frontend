<!-- <script setup lang="ts">
import { onMounted } from 'vue'
import { useMemesStore } from '@/stores/memes.store'
import MemeCard from '@/components/memes/MemeCard.vue'
import Pagination from '@/components/shared/Pagination.vue'

const store = useMemesStore()

onMounted(() => {
  store.fetchMemes()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="meme in store.memes"
        :key="meme.id"
        cols="12"
        md="4"
      >
        <MemeCard :meme="meme" />
      </v-col>
    </v-row>

    <Pagination v-if="store.totalPages > 1" />
  </v-container>
</template> -->

<template>
  <v-container class="text-center">
    <v-card class="pa-6">
      <v-card-text>
        Działa jak powinno
      </v-card-text>
    </v-card>
  </v-container>
</template>
