import { requiresAuth, postExists, isPostOwner, validPostId } from '@/guards'

export default [
    // All recipes feed
    {
        path: '/recipes',
        name: 'Recipes',
        component: () => import('@/views/Recipes/RecipeList.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // Create new recipe
    {
        path: '/recipes/create',
        name: 'CreateRecipe',
        component: () => import('@/views/Recipes/CreateRecipe.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // View single recipe detail
    {
        path: '/recipes/:id',
        name: 'RecipeDetail',
        component: () => import('@/views/Recipes/RecipeDetail.vue'),
        meta: { requiresAuth: true },
        beforeEnter: [requiresAuth, validPostId, postExists]
    },
    
    // Edit recipe (only owner can access)
    {
        path: '/recipes/:id/edit',
        name: 'EditRecipe',
        component: () => import('@/views/Recipes/EditRecipe.vue'),
        meta: { requiresAuth: true },
        beforeEnter: [requiresAuth, validPostId, isPostOwner]
    },
    
    // Explore/Discover recipes
    {
        path: '/explore',
        name: 'Explore',
        component: () => import('@/views/Recipes/Explore.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // Search recipes
    {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Recipes/Search.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // Browse by category
    {
        path: '/category/:category',
        name: 'RecipesByCategory',
        component: () => import('@/views/Recipes/CategoryRecipes.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    }
]