import { createRouter, createWebHistory } from 'vue-router'
import SessionsView from '../views/SessionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sessions',
      component: SessionsView,
    },
    {
      path: '/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue'),
    },
  ],
})

export default router
