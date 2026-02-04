<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/services/store/Auth/auth'

const router = useRouter()
const authStore = useAuthStore()

const emit = defineEmits(['close', 'switch-to-register'])

const credentials = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await authStore.login(credentials.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="login-modal-overlay">
    <div class="login-modal">
      <div class="modal-left">
        <div class="image-overlay">
          <h3 class="quote">"Embrace the art of cooking, where flavors come alive!"</h3>
        </div>
      </div>

      <div class="modal-right">
        <button class="close-btn" @click="emit('close')" aria-label="Close">×</button>
        
        <h2>Login</h2>
        <p class="subtitle">Enter your email to log in.</p>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input 
              id="email"
              v-model="credentials.email" 
              type="email" 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div class="form-group">
            <input 
              id="password"
              v-model="credentials.password" 
              type="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>

          <button type="submit" class="continue-btn" :disabled="authStore.loading">
            {{ authStore.loading ? 'Logging in...' : 'Continue' }}
          </button>

          <p v-if="authStore.error" class="error">{{ authStore.error }}</p>

          <div class="register-link">
            <p>
              Don't have an account? 
              <a href="#" @click.prevent="emit('switch-to-register')">Register here</a>
            </p>
          </div>

          <p class="terms">
            By continuing, you agree to the updated 
            <a href="#">Terms of Sale</a>, 
            <a href="#">Terms of Service</a>, and 
            <a href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.login-modal {
  display: flex;
  width: 100%;
  max-width: 900px;
  height: 600px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-left {
  flex: 1;
  background: linear-gradient(135deg, rgba(102, 186, 189, 0.9) 0%, rgba(78, 162, 165, 0.9) 100%),
              url('/lily-banse--YHSwy6uqvk-unsplash.png') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
}

.image-overlay {
  text-align: center;
  z-index: 1;
}

.quote {
  color: white;
  font-size: 28px;
  font-weight: 300;
  line-height: 1.5;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 350px;
}

.modal-right {
  flex: 1;
  padding: 50px 60px;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 32px;
  color: #999;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

h2 {
  margin-bottom: 8px;
  color: #1a1a1a;
  font-size: 32px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

.form-group {
  margin-bottom: 16px;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 15px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #1a237e;
}

input::placeholder {
  color: #999;
}

.continue-btn {
  width: 100%;
  padding: 14px;
  background: #1a237e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s;
}

.continue-btn:hover:not(:disabled) {
  background: #0d47a1;
}

.continue-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #d32f2f;
  text-align: center;
  margin-top: 12px;
  font-size: 14px;
}

.register-link {
  text-align: center;
  margin: 24px 0;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
}

.register-link p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.register-link a {
  color: #1a237e;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.register-link a:hover {
  color: #0d47a1;
  text-decoration: underline;
}

.terms {
  font-size: 12px;
  color: #666;
  text-align: center;
  margin: 20px 0 0 0;
  line-height: 1.5;
}

.terms a {
  color: #1a237e;
  text-decoration: none;
}

.terms a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-modal {
    flex-direction: column;
    height: auto;
    max-height: 90vh;
  }

  .modal-left {
    min-height: 200px;
    padding: 30px;
  }

  .quote {
    font-size: 20px;
  }

  .modal-right {
    padding: 30px;
  }

  h2 {
    font-size: 24px;
  }
}
</style>