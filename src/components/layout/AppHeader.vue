<script setup lang="ts">
import { useStore } from 'vuex'
import { useRacing } from '@/composables/useRacing'

const store = useStore()
const { generateRacing } = useRacing()

const generateProgram = () => {
  store.dispatch('racing/setProgram', generateRacing())
}
</script>

<template>
  <header class="bg-header-background border border-black p-2">
    <h1 class="text-3xl font-bold text-white">Horse Racing</h1>
    <button type="button" @click="generateProgram">Generate Program</button>
  </header>
</template>
