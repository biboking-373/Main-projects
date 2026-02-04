import { defineStore } from 'pinia'
import authApi from '@/services/api/auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        isAuthenticated: !!localStorage.getItem('user'), // Check if user exists instead of token
        loading: false,
        error: null
    }),

    actions: {
        async login(credentials) {
            try {
                this.loading = true
                this.error = null
                const data = await authApi.login(credentials)
                
                if (data.user) {
                    this.user = data.user
                    this.isAuthenticated = true
                    
                    // Only store user info, NOT the token (token is in cookie)
                    localStorage.setItem('user', JSON.stringify(data.user))
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Login failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async register(userData) {
            try {
                this.loading = true
                this.error = null
                const data = await authApi.register(userData)
                
                console.log(data.message)
                
            } catch (error) {
                this.error = error.response?.data?.message || 'Registration failed'
                throw error
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                // Optional: Call backend logout endpoint to clear cookie
                await authApi.logout()
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                // Clear local state
                this.user = null
                this.isAuthenticated = false
                this.error = null
                
                localStorage.removeItem('user')
            }
        },

        // Add a method to check if user is still authenticated
        async checkAuth() {
            try {
                const data = await authApi.checkAuth()
                if (data.user) {
                    this.user = data.user
                    this.isAuthenticated = true
                    localStorage.setItem('user', JSON.stringify(data.user))
                }
            } catch (error) {
                // Token expired or invalid
                this.logout()
            }
        }
    }
})