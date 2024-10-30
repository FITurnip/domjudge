// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import adminRoutes from './adminRoutes';
import playerRoutes from './playerRoutes';
import AuthService from '@/services/Auth'; // Import the AuthService

const authService = new AuthService(); // Create an instance of AuthService

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/auth/AuthView.vue'), // Use dynamic import
    },
    {
      path: '/admin',
      name: 'admin',
      children: [...adminRoutes], // Admin-specific routes
      meta: { requiresAuth: true }, // Mark admin routes as requiring auth
    },
    {
      path: '/player',
      name: 'player',
      children: [...playerRoutes], // Player-specific routes
      meta: { requiresAuth: true }, // Mark player routes as requiring auth
    },
  ],
});

// Global route guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  console.log(to);

  // Check if the route requires authentication
  if (requiresAuth) {
    // You can replace these with actual login checks
    const role = authService.getRole(); // Get the role from AuthService

    if (!role) {
      next({ name: 'auth' }); // Redirect to the auth route if not authenticated
    } else {
      const mainName = to.matched[0].name;
      if(mainName === role) next();
      else next({ name: 'auth' });
    }
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;
