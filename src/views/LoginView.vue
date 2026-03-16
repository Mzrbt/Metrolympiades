<script setup>

    import { ref, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { login } from '../composables/useApi'

    const router = useRouter()

    const email = ref("")
    const password = ref("")

    const isFormValid = computed(() => {
        return email.value.trim() && password.value.trim()
    })

    const isLoading = ref(false)

    async function handleLogin() {

        isLoading.value = true
        
        try {
            const data = await login(email.value, password.value)
            localStorage.setItem('token', data.token)
            router.push('/ranking')
        } catch (e) {
            console.log('Identifiants incorrects')
        } finally {
            isLoading.value = false
        }
    }

</script>

<template>
    <div class="flex flex-col pt-20 items-center">
        <h1 class="text-5xl">Connexion</h1>
        <form action="" class="pt-15">
            <input class="border" type="email" placeholder="E-mail">
        </form>
    </div>
</template>