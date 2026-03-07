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
  <header class="bg-header-background border border-black p-2 flex flex-row justify-between items-center">
    <h1 class="text-3xl font-bold text-black">Horse Racing</h1>
    <div class="flex flex-row gap-2">
      <button type="button" @click="generateProgram" class="bg-gray-300 text-black px-4 py-2 rounded-sm border border-blac hover:bg-gray-400 cursor-pointer">GENERATE PROGRAM</button>
      <button type="button" @click="generateProgram" class="bg-gray-300 text-black px-4 py-2 rounded-sm border border-black hover:bg-gray-400 cursor-pointer">START / STOP</button>
    </div>
  </header>
</template>
