<script setup>
import { createMatch, getTeams, getActivities } from '../composables/useApi'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const teams = ref([])
const activities = ref([])
const isLoading = ref(false)

const team2Id = ref("")
const activityId = ref("")
const startedAt = ref("")
const team1Score = ref(0)
const team2Score = ref(0)

const isFormValid = computed(() =>
  team2Id.value && activityId.value && startedAt.value
)

onMounted(async () => {
  try {
    teams.value = await getTeams()
    activities.value = await getActivities()
  } catch (e) {
    window.alert("Erreur lors du chargement")
  }
})

async function handleCreateMatch() {
  isLoading.value = true
  try {
    await createMatch(team2Id.value, activityId.value, startedAt.value, team1Score.value, team2Score.value)
    router.push('/games')
  } catch (e) {
    window.alert("Erreur lors de la création du match")
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold mb-8">Nouveau match</h1>

    <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-lg flex flex-col gap-4">

      <div class="flex flex-col gap-2">
        <label class="font-semibold text-gray-700">Équipe adverse</label>
        <select v-model="team2Id" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
          <option value="" disabled>Choisir une équipe</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-semibold text-gray-700">Activité</label>
        <select v-model="activityId" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500">
          <option value="" disabled>Choisir une activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-semibold text-gray-700">Heure du match</label>
        <input type="datetime-local" v-model="startedAt" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
      </div>

      <div class="flex gap-4">
        <div class="flex flex-col gap-2 flex-1">
          <label class="font-semibold text-gray-700">Score mon équipe</label>
          <input type="number" v-model="team1Score" min="0" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div class="flex flex-col gap-2 flex-1">
          <label class="font-semibold text-gray-700">Score équipe adverse</label>
          <input type="number" v-model="team2Score" min="0" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>
      </div>

      <button
        @click="handleCreateMatch"
        :disabled="!isFormValid || isLoading"
        class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Enregistrer
      </button>
    </div>
  </div>
</template>