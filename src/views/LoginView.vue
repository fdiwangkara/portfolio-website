<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <span class="login-logo">Fd</span>
        <div class="login-rule"></div>
        <h1 class="login-title">Dashboard Login</h1>
        <p class="login-subtitle">Enter your password to access the admin panel</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-wrap">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Enter admin password"
              autocomplete="current-password"
              ref="passwordInput"
            />
            <button type="button" class="toggle-pw" @click="showPassword = !showPassword">
              {{ showPassword ? '◉' : '○' }}
            </button>
          </div>
        </div>

        <p v-if="error" class="login-error">{{ error }}</p>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="!loading">Sign In</span>
          <span v-else class="login-spinner"></span>
        </button>
      </form>

      <div class="login-footer">
        <router-link to="/" class="back-link">← Back to Portfolio</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const passwordInput = ref(null)

onMounted(() => {
  // If already logged in, redirect to admin
  if (authStore.isAuthenticated) {
    router.replace('/admin')
    return
  }
  passwordInput.value?.focus()
})

async function handleLogin() {
  error.value = ''
  if (!password.value.trim()) {
    error.value = 'Please enter a password'
    return
  }

  loading.value = true

  // Small delay for UX
  await new Promise((r) => setTimeout(r, 400))

  const success = authStore.login(password.value)
  loading.value = false

  if (success) {
    router.replace('/admin')
  } else {
    error.value = 'Invalid password. Please try again.'
    password.value = ''
    passwordInput.value?.focus()
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: var(--space-xl);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  padding: var(--space-3xl);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.login-logo {
  font-family: var(--font-logo);
  font-size: 3rem;
  color: var(--color-text);
  display: block;
  margin-bottom: var(--space-md);
}

.login-rule {
  width: 40px;
  height: 2px;
  background: var(--color-accent);
  margin: 0 auto var(--space-lg);
}

.login-title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-xs);
}

.login-subtitle {
  font-family: var(--font-accent);
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.input-group label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xs);
  font-weight: 600;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrap input {
  width: 100%;
  padding: 12px 44px 12px 14px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-text);
  outline: none;
  transition: border-color var(--transition-fast);
}

.input-wrap input:focus {
  border-color: var(--color-text);
}

.toggle-pw {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: var(--color-text-muted);
  padding: 4px;
}

.login-error {
  font-size: 0.8rem;
  color: var(--color-red);
  text-align: center;
  margin: 0;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: var(--color-text);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.login-btn:hover:not(:disabled) {
  background: var(--color-text-secondary);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  text-align: center;
  margin-top: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.back-link {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-text);
}

@media (max-width: 480px) {
  .login-card {
    padding: var(--space-xl);
  }
}
</style>
