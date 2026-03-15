<script setup>
import { onMounted } from 'vue'
import { request } from './composables/useApi.js'

onMounted(async () => {
  const data = await request('/ranking')
  console.log(data)
})
</script>

<template>
  <p>Hello world</p>
</template>