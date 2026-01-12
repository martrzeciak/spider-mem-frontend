import { createRouter, createWebHistory } from 'vue-router'
import MemeListView from '@/views/MemeListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'memes',
      component: MemeListView,
    },
  ],
})

export default router
