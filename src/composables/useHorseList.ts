import { HORSE_NAMES } from '@/assets/horse-names'
import { generateUniqueHexColor } from '@/utils/colors'
import { randomNumber } from '@/utils/numbers'
import { generateUniqueId } from '@/utils/id'
import { useStore } from 'vuex'
import type { Horse } from '@/types/store/racing'
import { shuffle } from '@/utils/shuffle'

export const useHorseList = () => {
  const store = useStore()

  const generateHorseList = () => {
    const horseList: Horse[] = shuffle(HORSE_NAMES).map(
      (horseName): Horse => ({
        id: generateUniqueId(),
        name: horseName,
        color: generateUniqueHexColor(),
        condition: randomNumber(30, 100),
      }),
    )
    console.log(horseList)
    store.dispatch('racing/setHorseList', horseList)
  }

  return { generateHorseList }
}
