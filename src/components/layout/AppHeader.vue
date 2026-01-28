<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import logo from '@/assets/logo.png'
const auth = useAuthStore()
</script>

<template>
    <header class="header">
        <RouterLink to="/" class="logo">
            <img :src="logo" alt="Spider-mem logo"/>
        </RouterLink>

        <div v-if="!auth.isAuthenticated" class="actions">
            <button @click="auth.toggleRegisterForm" class="btn">Rejestracja</button>
            <button @click="auth.toggleLoginForm" class="btn primary">Zaloguj</button>
        </div>

        <div v-else>
            <span>{{ auth.user?.userName }}</span>
            <button @click="auth.logout" class="btn primary">Logout</button>
        </div>

    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 20px;
    background: #1e1e1e;
}

.logo {
    color: #fff;
    font-size: 1.4rem;
    text-decoration: none;
    font-weight: bold;
    display: flex;
}

.actions {
    display: flex;
    gap: 12px;
}

.btn {
    padding: 6px 12px;
    border: 1px solid #ccc;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
}

.primary {
    background: #000;
}

img {
    height: 60px;
}
</style>
