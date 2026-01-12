<template>
  <div class="app-wrapper">
    <div class="app-container">
      <main class="content">
        <!--  main content -->
        <section class="left">
          <router-view />
        </section>

        <!--  sidebar -->
        <aside class="right">
          <Sidebar />
        </aside>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<style scoped>
.app-wrapper {
  display: flex;
  justify-content: center;
}

.app-container {
  width: 100%;
  max-width: 1200px;
  padding: 16px;
}

.content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 24px;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
