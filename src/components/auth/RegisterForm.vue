<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const store = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const submit = () => {
    if (password.value !== confirmPassword.value) {
        alert('Hasła nie są takie same')
        return
    }

    store.register(username.value, email.value, password.value)
}
</script>

<template>
    <div>
        <h3>Rejestracja</h3>

        <input v-model="username" placeholder="Username" />
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Hasło" />
        <input v-model="confirmPassword" type="password" placeholder="Powtórz hasło" />

        <button @click="submit">Zarejestruj</button>

        <p v-if="store.error">{{ store.error }}</p>
    </div>
</template>