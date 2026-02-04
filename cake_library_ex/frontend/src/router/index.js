import { createRouter, createWebHistory } from 'vue-router'
import { requiresAuth, guestOnly, postExists, isPostOwner, validPostId } from '@/router/guards'

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: () => import('@/views/authentication.vue'),
    beforeEnter: guestOnly
  },
  
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Explore.vue'),
    beforeEnter: requiresAuth
  },

  // // Recipe Routes
  // {
  //   path: '/recipes',
  //   name: 'Recipes',
  //   component: () => import('@/views/RecipeList.vue'),
  //   beforeEnter: requiresAuth
  // },
  // {
  //   path: '/recipes/create',
  //   name: 'CreateRecipe',
  //   component: () => import('@/views/CreateRecipe.vue'),
  //   beforeEnter: requiresAuth
  // },
  // {
  //   path: '/recipes/:id',
  //   name: 'RecipeDetail',
  //   component: () => import('@/views/RecipeDetail.vue'),
  //   beforeEnter: [requiresAuth, validPostId, postExists]
  // },
  // {
  //   path: '/recipes/:id/delete',
  //   name: 'DeleteRecipe',
  //   component: () => import('@/views/DeleteRecipe.vue'),
  //   beforeEnter: [requiresAuth, validPostId, isPostOwner]
  // },
  // {
  //   path: '/user/:userId/recipes',
  //   name: 'UserRecipes',
  //   component: () => import('@/views/UserRecipes.vue'),
  //   beforeEnter: requiresAuth
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global auth guard (fallback)
router.beforeEach((to, from, next) => {
  // This runs after route-specific guards
  next()
})

export default router