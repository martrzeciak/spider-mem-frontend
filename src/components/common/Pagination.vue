<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="pagination">
    <button
      @click="emit('prev')"
      :disabled="currentPage === 1"
    >
      ← Poprzednia
    </button>

    <span>
      Strona {{ currentPage }} / {{ totalPages }}
    </span>

    <button
      @click="emit('next')"
      :disabled="currentPage === totalPages"
    >
      Następna →
    </button>
  </div>
</template>
