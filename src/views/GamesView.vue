<script setup>
import { getMyMatches, deleteMatch } from '../composables/useApi'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const matches = ref([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    matches.value = await getMyMatches()
  } catch (e) {
    window.alert("Erreur lors du chargement des matchs")
  } finally {
    isLoading.value = false
  }
})

async function handleDeleteMatch(matchId) {
  try {
    await deleteMatch(matchId)
    matches.value = matches.value.filter(m => m.id !== matchId)
  } catch (e) {
    window.alert("Erreur lors de la suppression")
  }
}
</script>

<template>
  <div class="p-10">
    <div class="flex items-center justify-between max-w-2xl mb-8">
      <h1 class="text-4xl font-bold">Mes matchs</h1>
      <button
        @click="router.push('/games/new')"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        + Ajouter un match
      </button>
    </div>

    <div v-if="isLoading" class="text-gray-500">Chargement...</div>

    <div v-else-if="matches.length === 0" class="text-gray-400">
      Aucun match pour le moment
    </div>

    <div v-else class="flex flex-col gap-3 max-w-2xl">
      <div
        v-for="match in matches"
        :key="match.id"
        class="bg-white border border-gray-200 rounded-lg px-6 py-4 shadow-sm flex items-center justify-between"
      >
        <div class="flex flex-col gap-1">
          <span class="font-semibold">{{ match.team1 }} vs {{ match.team2 }}</span>
          <span class="text-gray-500 text-sm">{{ match.activity }} — {{ new Date(match.startedAt).toLocaleString() }}</span>
          <span class="text-blue-500 font-bold">{{ match.team1Score }} - {{ match.team2Score }}</span>
        </div>
        <button
          @click="handleDeleteMatch(match.id)"
          class="text-red-400 hover:text-red-600 transition-colors"
        >✕</button>
      </div>
    </div>
  </div>
</template>