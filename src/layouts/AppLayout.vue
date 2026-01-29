<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import Sidebar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="app-wrapper">
    <div class="app-container">
      <AppHeader />
      <main class="content">
        <section class="left">
          <div class="feed">
            <router-view />
          </div>
        </section>

        <aside class="right">
          <Sidebar />
        </aside>
      </main>
    </div>
  </div>
</template>

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
  grid-template-columns: minmax(0, 3fr) minmax(0, 1fr);
  gap: 24px;
}

.left {
  min-width: 0;
}

.feed {
  max-width: 720px;
  width: 100%;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
