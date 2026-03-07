import { RACING_CONFIG } from '@/constants'

type Horse = {
  id: string
  name: string
  color: string
  condition: number
}

type RaceProgram = {
  programIndex?: number
  horses: {
    lane: number
    horse: Horse
  }[]
  raceLength: (typeof RACING_CONFIG.RACING_LANE_LENGTHS)[number]
  winner?: Horse
}

type HorsePosition = {
  horseId: string
  position: number
}

type ActiveRace = {
  programIndex: number
  program: RaceProgram
  horsePositions: HorsePosition[]
}

export type { Horse, RaceProgram, HorsePosition, ActiveRace }
