<script setup>

    import { getRanking } from '../composables/useApi.js'
    import { ref, computed, onMounted } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()

    const teamsRanking = ref([])

    const isLoading = ref(false)

    onMounted(async () => {
        isLoading.value = true
        const data = await getRanking()
        teamsRanking.value = data
        isLoading.value = false
    })

    const sortedRanking = computed(() => {
        return [...teamsRanking.value].sort((a, b) => b.points - a.points)
    })

</script>

<template>
    <div class="p-10">

        <h1 class="text-4xl font-bold mb-8">Classement général</h1>

        <div v-if="isLoading" class="text-gray-500">Chargement...</div>

        <div v-if="teamsRanking.length === 0 && !isLoading" class="text-gray-500">Aucune équipe pour le moment</div>

        <div v-else class="flex flex-col gap-3">
            <div
                v-for="(teamRank, index) in sortedRanking"
                :key="teamRank.team"
                class="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm"
            >
                <div class="flex items-center gap-4">
                <span class="text-2xl font-bold text-gray-400">#{{ index + 1 }}</span>
                <span class="text-lg font-semibold">{{ teamRank.team }}</span>
                </div>
                <span class="text-blue-500 font-bold text-lg">{{ teamRank.points }} pts</span>
            </div>
        </div>
    </div>
</template>