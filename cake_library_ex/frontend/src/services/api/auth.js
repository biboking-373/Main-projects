import apiClient from './axios'

export default {
    async login(credentials) {
        try {
            const response = await apiClient.post('/auth/login', credentials)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async register(userData) {
        try {
            const response = await apiClient.post('/auth/register', userData)
            return response.data
        } catch (error) {
            throw error
        }
    },

    async logout() {
        try {
            const response = await apiClient.post('/auth/logout')
            return response.data
        } catch (error) {
            throw error
        }
    },

    // Check if user is authenticated (verify cookie is valid)
    async checkAuth() {
        try {
            const response = await apiClient.get('/auth/check-me')
            return response.data
        } catch (error) {
            throw error
        }
    }
}