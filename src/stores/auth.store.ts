import { defineStore } from 'pinia'
import type { User } from '@/models/user'
import { loginMock, registerMock } from '@/mocks/auth.mock'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        loading: false,
        error: null as string | null,

        showLoginForm: false,
        showRegisterForm: false
    }),

    getters: {
        isAuthenticated: state => !!state.user
    },

    actions: {
        async login(email: string, password: string) {
        this.loading = true
        this.error = null

        try {
            this.user = await loginMock(email, password)
            this.closeForms()
        } catch (e: any) {
            this.error = e.message
        } finally {
            this.loading = false
        }
        },

        async register(
        username: string,
        email: string,
        password: string
        ) {
        this.loading = true
        this.error = null

        try {
            this.user = await registerMock(username, email, password)
            this.closeForms()
        } catch (e: any) {
            this.error = e.message
        } finally {
            this.loading = false
        }
        },

        logout() {
            this.user = null
        },

        toggleLoginForm() {
            this.showLoginForm = !this.showLoginForm
            this.showRegisterForm = false
        },

        toggleRegisterForm() {
            this.showRegisterForm = !this.showRegisterForm
            this.showLoginForm = false
        },

        closeForms() {
            this.showLoginForm = false
            this.showRegisterForm = false
        }
    }
})
