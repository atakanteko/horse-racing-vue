import { RACING_CONFIG } from '@/constants'

type Horse = {
  id: string
  name: string
  color: string
  condition: number
}

type RaceProgram = {
  horses: {
    lane: number
    horse: Horse
  }[]
  raceLength: (typeof RACING_CONFIG.RACING_LANE_LENGTHS)[number]
}

export type { Horse, RaceProgram }
