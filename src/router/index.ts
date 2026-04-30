import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
    path: '/',
    redirect: '/tasks'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/AuthPage.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/pages/AuthPage.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/pages/TasksPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/pages/projectsPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/pages/AdminDashboardPage.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/pages/profilePage.vue'),
    meta: { requiresAuth: true }
  },
],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  if (authStore.token && !authStore.user) {
      await authStore.checkAuth()
    }
    const isAuth = !!authStore.token
    if (to.meta.requiresAuth && !isAuth) {
      next('/login')
    } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
      next('/tasks')
    } else {
      next()
    }
})

export default router
