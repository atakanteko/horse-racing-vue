import { createStore, type Store, type Action } from 'vuex'
import { vi } from 'vitest'
import type { RacingState } from '@/stores/modules/racing'
import type { Horse, RaceProgram, ActiveRace } from '@/types/store/racing'

type RacingAction = Action<RacingState, { racing: RacingState }>

export interface MockRacingStoreOptions {
  horses?: Horse[]
  programs?: RaceProgram[]
  activeRace?: ActiveRace | null
  finishedRaces?: RaceProgram[]
  isRunning?: boolean
  mockActions?: {
    setHorseList?: RacingAction
    setProgram?: RacingAction
    startRace?: RacingAction
    updateRacePositions?: RacingAction
    finishRace?: RacingAction
    stopRace?: RacingAction
    resumeRace?: RacingAction
  }
}

export function createMockRacingStore(
  options: MockRacingStoreOptions = {},
): Store<{ racing: RacingState }> {
  const {
    horses = [],
    programs = [],
    activeRace = null,
    finishedRaces = [],
    isRunning = false,
    mockActions = {},
  } = options

  return createStore({
    modules: {
      racing: {
        namespaced: true,
        state: {
          horses,
          programs,
          activeRace,
          finishedRaces,
          isRunning,
        },
        getters: {
          getHorses: (state: RacingState) => state.horses,
          getPrograms: (state: RacingState) => state.programs,
          getActiveRace: (state: RacingState) => state.activeRace,
          getFinishedRaces: (state: RacingState) => state.finishedRaces,
          isRaceRunning: (state: RacingState) => state.isRunning,
        },
        actions: {
          setHorseList: (mockActions.setHorseList || vi.fn()) as RacingAction,
          setProgram: (mockActions.setProgram || vi.fn()) as RacingAction,
          startRace: (mockActions.startRace || vi.fn()) as RacingAction,
          updateRacePositions: (mockActions.updateRacePositions || vi.fn()) as RacingAction,
          finishRace: (mockActions.finishRace || vi.fn()) as RacingAction,
          stopRace: (mockActions.stopRace || vi.fn()) as RacingAction,
          resumeRace: (mockActions.resumeRace || vi.fn()) as RacingAction,
        },
      },
    },
  })
}
