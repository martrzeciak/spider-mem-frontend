import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import MemeListView from '@/views/MemeListView.vue'
import MemeDetailsView from '@/views/MemeDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'memes',
          component: MemeListView,
        },
        {
          path: 'memes/:id',
          name: 'mem-details',
          component: MemeDetailsView,
          props: true,
        },
      ],
    },
  ],
})

export default router
