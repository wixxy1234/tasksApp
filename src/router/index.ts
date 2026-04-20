import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuth = !!authStore.token

  if (to.meta.requiresAuth && !isAuth){
    next("/login")
  } else {
    next()
  }

})

export default router
