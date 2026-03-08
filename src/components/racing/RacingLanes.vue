<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { ActiveRace } from '@/types/store/racing'
import RunningHorseIcon from '@/assets/images/running-horse.svg?url'

const store = useStore()
const activeRace = computed<ActiveRace | null>(() => store.getters['racing/getActiveRace'])
const isRunning = computed(() => store.getters['racing/isRaceRunning'])

const lanes = computed(() => {
  if (!activeRace.value) {
    return []
  }

  return activeRace.value.program.horses.map((horseData) => {
    const position = activeRace.value!.horsePositions.find(
      (pos) => pos.horseId === horseData.horse.id,
    )
    return {
      lane: horseData.lane,
      horse: horseData.horse,
      position: position?.position ?? 0,
    }
  })
})

const raceLength = computed(() => activeRace.value?.program.raceLength || 100)

const getPositionPercentage = (position: number): number => {
  if (position <= 0) return 0
  return Math.min((position / raceLength.value) * 100, 100)
}
</script>

<template>
  <div class="h-full w-full bg-gray-200 flex flex-col relative">
    <div v-if="!activeRace" class="flex items-center justify-center h-full text-gray-500">
      <p data-testid="racing-lanes-no-active-race-message">
        No active race. Generate a program and start racing!
      </p>
    </div>
    <div v-else class="h-full flex flex-col">
      <div
        v-if="!isRunning"
        class="flex items-center justify-center py-2 bg-yellow-200 text-black font-semibold"
      >
        ⏸ Race Ready - Click START to begin
      </div>
      <div
        v-for="lane in lanes"
        :key="`lane-${lane.lane}-${lane.horse.id}`"
        class="relative flex items-center border-b border-dashed border-gray-400"
        :style="{ height: `${100 / lanes.length}%` }"
        data-testid="racing-lanes-lane"
      >
        <div
          class="bg-green-700 text-white w-12 h-full flex items-center justify-center shrink-0 font-bold"
        >
          {{ lane.lane }}
        </div>
        <div class="flex-1 relative h-full bg-gray-100">
          <div
            class="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 transition-all duration-75 ease-linear"
            :style="{ left: `${getPositionPercentage(lane.position)}%` }"
            data-testid="racing-lanes-horse"
          >
            <img
              :src="RunningHorseIcon"
              alt="Horse"
              class="w-10 h-10 shrink-0"
              :style="{
                filter: `drop-shadow(0 0 4px ${lane.horse.color}) drop-shadow(0 0 8px ${lane.horse.color})`,
              }"
              data-testid="racing-lanes-horse-icon"
            />
          </div>
        </div>
        <div class="bg-red-600 w-2 h-full shrink-0"></div>
      </div>
    </div>
  </div>
</template>
