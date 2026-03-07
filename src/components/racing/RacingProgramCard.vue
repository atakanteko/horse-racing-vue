<script setup lang="ts">
import type { RaceProgram } from '@/types/store/racing'

interface Props {
  title: string
  programs: RaceProgram[]
  headerColor?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Program',
  headerColor: 'bg-program-background',
})
</script>


<template>

  <div class="h-full w-full flex flex-col overflow-hidden">
    <h2 class="text-2xl font-bold mb-2 p-2 shrink-0 text-center" :class="headerColor">
      {{ title }}
    </h2>
    <div class="flex-1 overflow-y-auto">
      <div v-for="(program, index) in programs" :key="index" class="mb-4">
        <div class="bg-header-background text-black font-bold text-center py-1">{{ `LAP ${index + 1} - ${program.raceLength}` }}m</div>
        <table class="w-full bg-white border border-gray-300">
          <thead class="bg-gray-300">
            <tr>
              <th class="text-center border border-gray-400 p-2">Position</th>
              <th class="text-center border border-gray-400 p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(horse, horseIndex) in program.horses" :key="horseIndex">
              <td class="border border-gray-300 p-2 text-center">{{ horse.lane }}</td>
              <td class="border border-gray-300 p-2">{{ horse.horse.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
