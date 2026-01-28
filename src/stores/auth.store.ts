import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { LoginResponse, RegisterResponse, User } from '@/models/auth.models'

const API = 'https://localhost:5001/api/Auth'

export const useAuthStore = defineStore('auth', () => {
    // STATE 
    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('token'))
    const isAuthenticated = ref(!!token.value)
    const error = ref<string | null>(null)

    const showLoginForm = ref(false)
    const showRegisterForm = ref(false)

    //  UI 
    const toggleLoginForm = () => {
        showLoginForm.value = !showLoginForm.value
        showRegisterForm.value = false
    }

    const toggleRegisterForm = () => {
        showRegisterForm.value = !showRegisterForm.value
        showLoginForm.value = false
    }

    //  AUTH 
    const login = async (email: string, password: string) => {
        error.value = null
        try {
        const res = await axios.post<LoginResponse>(`${API}/login`, { email, password })

        token.value = res.data.token
        user.value = {
            email: res.data.email,
            userName: res.data.userName
        }
        isAuthenticated.value = true
        localStorage.setItem('token', res.data.token)

        showLoginForm.value = false
        } catch (e: any) {
        error.value = 'Nieprawidłowy email lub hasło'
        }
    }

    const register = async (userName: string, email: string, password: string) => {
        error.value = null
        try {
        await axios.post<RegisterResponse>(`${API}/register`, { userName, email, password })
        await login(email, password)
        } catch (e: any) {
        error.value = 'Błąd rejestracji'
        }
    }

    const logout = () => {
        token.value = null
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('token')
    }

    // AUTO LOGIN / FETCH CURRENT USER 
    const fetchCurrentUser = async () => {
        if (!token.value) return

        try {
        const res = await axios.get<User>(`${API}/me`, {
            headers: { Authorization: `Bearer ${token.value}` }
        })
        user.value = res.data
        isAuthenticated.value = true
        } catch (e) {
        logout() 
        }
    }

    return {
        user,
        token,
        isAuthenticated,
        error,
        showLoginForm,
        showRegisterForm,
        toggleLoginForm,
        toggleRegisterForm,
        login,
       register,
        logout,
        fetchCurrentUser
    }
})
