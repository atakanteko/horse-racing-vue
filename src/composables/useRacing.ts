import type { Horse, RaceProgram } from '@/types/store/racing'
import { getRandomElements } from '@/utils/array'
import { useStore } from 'vuex'
import { RACING_CONFIG } from '@/constants'
import { computed } from 'vue'

export const useRacing = () => {
  const store = useStore()
  const horses = computed(() => store.getters['racing/getHorses'])

  const generateRacing = (): RaceProgram[] => {
    return RACING_CONFIG.RACING_LANE_LENGTHS.map((raceLength) => {
      const selectedHorses = getRandomElements<Horse>(horses.value, RACING_CONFIG.HORSE_LIST_LENGTH)

      const horsesWithLanes = selectedHorses.map((horse, index) => ({
        lane: index + 1,
        horse,
      }))

      return {
        raceLength,
        horses: horsesWithLanes,
      }
    })
  }

  return { generateRacing }
}
