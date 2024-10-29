import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './adminRoutes'
import playerRoutes from './playerRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: import('@/views/auth/AuthView.vue')
    },

    {
      path: '/admin',
      name: 'admin',
      children: [...adminRoutes]
    },

    {
      path: '/player',
      name: 'player',
      children: [...playerRoutes]
    }
  ]
})

export default router
