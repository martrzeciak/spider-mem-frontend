<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const store = useAuthStore()

const email = ref('')
const password = ref('')

const submit = () => {
    store.login(email.value, password.value)
}
</script>

<template>
    <div>
        <h3>Logowanie</h3>

        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Hasło" />

        <button @click="submit">Zaloguj</button>

        <p v-if="store.error">{{ store.error }}</p>
    </div>
</template>
