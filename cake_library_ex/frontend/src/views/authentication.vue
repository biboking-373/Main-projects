<template>
  <div class="auth-view">
    <Login 
      v-if="activeTab === 'login'" 
      @switch-to-register="switchToRegister"
      @close="handleClose"
    />
    <Registration 
      v-else 
      @registration-success="handleRegistrationSuccess"
      @switch-to-login="switchToLogin"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Login from '@/components/AUTH/Login.vue'
import Registration from '@/components/AUTH/Registration.vue'

const router = useRouter()
const activeTab = ref('login')

const switchToRegister = () => {
  activeTab.value = 'register'
}

const switchToLogin = () => {
  activeTab.value = 'login'
}

const handleRegistrationSuccess = () => {
  activeTab.value = 'login'
}

const handleClose = () => {
  // Redirect to home page or wherever you want when modal is closed
  router.push('/')
}
</script>



<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
}

.auth-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.auth-tabs button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s;
}

.auth-tabs button.active {
  background: #667eea;
  color: white;
}

.auth-tabs button:hover {
  opacity: 0.8;
}
</style>