import { HORSE_NAMES } from '@/assets/horse-names'
import { generateUniqueHexColor } from '@/utils/colors'
import { useStore } from 'vuex'
import type { Horse } from '@/types/store/racing'
import { shuffle } from '@/utils/shuffle'

export const useHorseList = () => {
  const store = useStore()

  const generateHorseList = () => {
    const horseList: Horse[] = shuffle(HORSE_NAMES).map((horseName): Horse => ({
      id: new Date().valueOf().toString(),
      name: horseName,
      color: generateUniqueHexColor(),
    }))
    console.log(horseList)
    store.dispatch('racing/setHorseList', horseList)
  }

  return { generateHorseList }
}
