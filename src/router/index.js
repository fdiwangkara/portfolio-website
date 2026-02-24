import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const ProjectDetailView = () => import('../views/ProjectDetailView.vue')
const AdminPanel = () => import('../views/AdminPanel.vue')
const LoginView = () => import('../views/LoginView.vue')

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/project/:id', name: 'ProjectDetail', component: ProjectDetailView },
  { path: '/login', name: 'Login', component: LoginView },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const session = sessionStorage.getItem('portfolio-auth')
    if (session !== 'true') {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
