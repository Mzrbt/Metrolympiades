<script setup>
import { onMounted } from 'vue'
import { request } from './composables/useApi.js'

onMounted(async () => {
  const data = await request('/matches')
  console.log(data)
})
</script>

<template>
  <RouterView />
</template>