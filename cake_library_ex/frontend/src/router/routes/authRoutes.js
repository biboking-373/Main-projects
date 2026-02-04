export const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/AUTH/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/AUTH/Register.vue')
  }
]