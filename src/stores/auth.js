import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)

    // Check session on load
    const session = sessionStorage.getItem('portfolio-auth')
    if (session === 'true') {
        isAuthenticated.value = true
    }

    function login(password) {
        // Default admin password — can be changed in localStorage
        const storedPassword = localStorage.getItem('portfolio-admin-password') || 'admin123'
        if (password === storedPassword) {
            isAuthenticated.value = true
            sessionStorage.setItem('portfolio-auth', 'true')
            return true
        }
        return false
    }

    function logout() {
        isAuthenticated.value = false
        sessionStorage.removeItem('portfolio-auth')
    }

    function changePassword(oldPw, newPw) {
        const currentPw = localStorage.getItem('portfolio-admin-password') || 'admin123'
        if (oldPw === currentPw) {
            localStorage.setItem('portfolio-admin-password', newPw)
            return true
        }
        return false
    }

    return { isAuthenticated, login, logout, changePassword }
})
