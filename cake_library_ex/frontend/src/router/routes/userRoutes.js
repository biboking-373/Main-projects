import { requiresAuth } from '@/guards'

export default [
    // User profile
    {
        path: '/profile/:userId',
        name: 'UserProfile',
        component: () => import('@/views/User/UserProfile.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // Current user's own profile
    {
        path: '/my-profile',
        name: 'MyProfile',
        component: () => import('@/views/User/MyProfile.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // User's recipes
    {
        path: '/user/:userId/recipes',
        name: 'UserRecipes',
        component: () => import('@/views/User/UserRecipes.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // User's saved/bookmarked recipes
    {
        path: '/saved-recipes',
        name: 'SavedRecipes',
        component: () => import('@/views/User/SavedRecipes.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    },
    
    // Edit profile
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/User/Settings.vue'),
        meta: { requiresAuth: true },
        beforeEnter: requiresAuth
    }
]