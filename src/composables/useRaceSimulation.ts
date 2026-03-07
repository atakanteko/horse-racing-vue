import { ref, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'
import type { RaceProgram, HorsePosition, Horse } from '@/types/store/racing'
import { randomNumber } from '@/utils/numbers'

export const useRaceSimulation = () => {
  const store = useStore()
  const intervalId = ref<number | null>(null)

  const activeRace = computed(() => store.getters['racing/getActiveRace'])
  const programs = computed(() => store.getters['racing/getPrograms'])
  const isRunning = computed(() => store.getters['racing/isRaceRunning'])

  const calculateHorseSpeed = (condition: number): number => {
    const baseSpeed = randomNumber(30, 80)
    const conditionBonus = (condition / 100) * randomNumber(10, 30)
    return baseSpeed + conditionBonus
  }

  const updateRace = (): void => {
    if (!activeRace.value || !isRunning.value) {
      return
    }
    const currentPositions = activeRace.value.horsePositions
    const newPositions: HorsePosition[] = currentPositions.map((pos: HorsePosition) => {
      const horseData = activeRace.value!.program.horses.find(
        (h: { horse: Horse; lane: number }) => h.horse.id === pos.horseId,
      )
      if (!horseData) return pos

      const speed = calculateHorseSpeed(horseData.horse.condition)
      const newPosition = pos.position + speed * 0.1
      const maxPosition = activeRace.value.program.raceLength

      return {
        horseId: pos.horseId,
        position: Math.min(newPosition, maxPosition),
      }
    })

    store.dispatch('racing/updateRacePositions', newPositions)
    const finished = newPositions.some(
      (pos: HorsePosition) => pos.position >= activeRace.value!.program.raceLength,
    )
    if (finished) {
      stopSimulation()
      const sortedPositions = [...newPositions].sort(
        (a: HorsePosition, b: HorsePosition) => b.position - a.position,
      )
      const winnerId = sortedPositions[0]!.horseId
      const winner = activeRace.value.program.horses.find(
        (h: { horse: Horse; lane: number }) => h.horse.id === winnerId,
      )?.horse

      const sortedHorses = sortedPositions.map((pos: HorsePosition) => {
        const horseData = activeRace.value!.program.horses.find(
          (h: { horse: Horse; lane: number }) => h.horse.id === pos.horseId,
        )
        if (!horseData) {
          throw new Error(`Horse data not found for horseId: ${pos.horseId}`)
        }
        return {
          lane: horseData.lane,
          horse: horseData.horse,
        }
      })

      const finishedProgram: RaceProgram = {
        ...activeRace.value.program,
        programIndex: activeRace.value.programIndex,
        horses: sortedHorses,
        winner,
      }

      const currentProgramIndex = activeRace.value.programIndex
      store.dispatch('racing/finishRace', finishedProgram)

      const nextProgramIndex = currentProgramIndex + 1
      if (nextProgramIndex < programs.value.length) {
        setTimeout(() => {
          store.dispatch('racing/startRace', nextProgramIndex)
          startSimulation()
        }, 1000)
      } else {
        store.dispatch('racing/stopRace')
      }
    }
  }

  const startSimulation = (): void => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
    }
    intervalId.value = setInterval(() => {
      updateRace()
    }, 50)
  }

  const stopSimulation = (): void => {
    if (intervalId.value) {
      clearInterval(intervalId.value)
      intervalId.value = null
    }
  }

  const startRace = (): void => {
    if (programs.value.length === 0) return

    if (!activeRace.value) {
      store.dispatch('racing/startRace', 0)
    }
    store.dispatch('racing/resumeRace')
    startSimulation()
  }

  const stopRace = (): void => {
    stopSimulation()
    store.dispatch('racing/stopRace')
  }

  const toggleRace = (): void => {
    if (isRunning.value) {
      stopRace()
    } else {
      startRace()
    }
  }

  onUnmounted(() => {
    stopSimulation()
  })

  return {
    startRace,
    stopRace,
    toggleRace,
    activeRace,
    isRunning,
  }
}
