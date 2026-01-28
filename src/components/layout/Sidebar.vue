<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import AddMemeForm from '@/components/memes/AddMemeForm.vue'

const auth = useAuthStore()
</script>

<template>
    <div class="sidebar">

        <section class="block">
            <h3>Info</h3>
            <p>SpiderMem frontend</p>
        </section>

        <LoginForm v-if="auth.showLoginForm && !auth.isAuthenticated" />
        <RegisterForm v-if="auth.showRegisterForm && !auth.isAuthenticated" />
        <AddMemeForm v-if="auth.isAuthenticated" />
    </div>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.block {
    border: 1px solid #ddd;
    margin: 12px;
    padding: 12px;
    border-radius: 6px;
}
</style>
