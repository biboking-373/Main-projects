<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/services/store/Auth/auth'

const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

onMounted(async () => {
    await authStore.checkAuth()
})

const handleLogout = async () => {
    try {
        await authStore.logout()
    } catch (error) {
        console.error('Logout failed:', error)
    }
}

const handleLogin = () => {
    window.location.href = '/login'
}

const handleSubscribe = () => {
    window.location.href = '/subscribe'
}
</script>

<template>
    <div class="dashboard">
        <div class="header">
            <div class="logo">
                <div class="logo-icon">C</div>
                <span class="logo-text">Chefify</span>
            </div>

            <div class="search">
                <div class="search-bar">
                    <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="What would you like to cook?" />
                </div>
            </div>

            <div class="contents">
                <div class="specific-links">
                    <a href="#" class="nav-link">Explore</a>
                    <a href="#" class="nav-link">Recipes</a>
                    <a href="#" class="nav-link">Ingredients</a>
                </div>
            </div>

            <div class="auth">
                <template v-if="!isLoggedIn">
                    <button class="login" @click="handleLogin">Login</button>
                    <button class="sign-in" @click="handleSubscribe">Subscribe</button>
                </template>
                
                <template v-else>
                    <span v-if="user" class="user-name">{{ user.name || user.email }}</span>
                    <button class="logout" @click="handleLogout">Logout</button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    min-height: 10vh;
    background-color: #f9fafb;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.logo-icon {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #2563eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
}

.logo-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
}

.search {
    flex: 1;
    max-width: 28rem;
    margin: 0 2rem;
}

.search-bar {
    position: relative;
    width: 100%;
}

.search-icon {
    width: 1.25rem;
    height: 1.25rem;
    color: #9ca3af;
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
}

.search-bar input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
}

.search-bar input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-bar input::placeholder {
    color: #9ca3af;
}

.specific-links {
    display: flex;
    gap: 1.5rem;
}

.nav-link {
    color: #4b5563;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #2563eb;
}

.auth {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: 2rem;
}

.auth button {
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
}

.login {
    background-color: transparent;
    color: #2563eb;
}

.login:hover {
    background-color: #eff6ff;
}

.sign-in {
    background-color: #2563eb;
    color: white;
}

.sign-in:hover {
    background-color: #1d4ed8;
}

.logout {
    background-color: #dc2626;
    color: white;
}

.logout:hover {
    background-color: #b91c1c;
}

.user-name {
    color: #1f2937;
    font-size: 0.875rem;
    font-weight: 500;
}
</style>