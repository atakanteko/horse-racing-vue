<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRacing } from '@/composables/useRacing'
import { useRaceSimulation } from '@/composables/useRaceSimulation'

const store = useStore()
const { generateRacing } = useRacing()
const { toggleRace, isRunning } = useRaceSimulation()

const programs = computed(() => store.getters['racing/getPrograms'])

const generateProgram = () => {
  store.dispatch('racing/setProgram', generateRacing())
}
</script>

<template>
  <header
    class="bg-header-background border border-black p-2 flex flex-row justify-between items-center"
  >
    <h1 class="text-3xl font-bold text-black" data-testid="app-header-title">Horse Racing</h1>
    <div class="flex flex-row gap-2">
      <button
        type="button"
        @click="generateProgram"
        :disabled="isRunning"
        class="bg-gray-300 text-black px-4 py-2 rounded-sm border border-black hover:bg-gray-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="app-header-start-button"
      >
        GENERATE PROGRAM
      </button>
      <button
        type="button"
        @click="toggleRace"
        :disabled="programs.length === 0"
        class="bg-gray-300 text-black px-4 py-2 rounded-sm border border-black hover:bg-gray-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="app-header-toggle-button"
      >
        {{ isRunning ? 'STOP' : 'START' }}
      </button>
    </div>
  </header>
</template>
