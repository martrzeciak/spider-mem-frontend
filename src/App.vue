<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
</script>

<template>
  <div v-if="!auth.authChecked">
    Sprawdzanie sesji...
  </div>

  <router-view v-else />
</template>