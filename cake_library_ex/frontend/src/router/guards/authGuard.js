import { useAuthStore } from '@/services/store/Auth/auth'

// Check if user is authenticated
export const requiresAuth = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next('/auth')  // Redirect to auth/login page
  } else {
    next()
  }
}

// Redirect authenticated users away from auth pages
export const guestOnly = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    next('/explore')  // Redirect logged-in users to dashboard
  } else {
    next()
  }
}