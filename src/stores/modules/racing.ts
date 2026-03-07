import type { Module, Commit } from 'vuex'
import type { RootState } from '@/types/store/store'
import type { Horse, RaceProgram, ActiveRace, HorsePosition } from '@/types/store/racing'

export interface RacingState {
  horses: Horse[]
  programs: RaceProgram[]
  activeRace: ActiveRace | null
  finishedRaces: RaceProgram[]
  isRunning: boolean
}

const state: RacingState = {
  horses: [],
  programs: [],
  activeRace: null,
  finishedRaces: [],
  isRunning: false,
}

const getters = {
  getHorses: (state: RacingState) => state.horses,
  getPrograms: (state: RacingState) => state.programs,
  getActiveRace: (state: RacingState) => state.activeRace,
  getFinishedRaces: (state: RacingState) => state.finishedRaces,
  isRaceRunning: (state: RacingState) => state.isRunning,
}

const mutations = {
  SET_HORSE_LIST(state: RacingState, horses: Horse[]) {
    state.horses = horses
  },
  SET_PROGRAM(state: RacingState, programs: RaceProgram[]) {
    state.programs = programs
  },
  SET_ACTIVE_RACE(state: RacingState, race: ActiveRace | null) {
    state.activeRace = race
  },
  UPDATE_RACE_POSITIONS(state: RacingState, positions: HorsePosition[]) {
    if (state.activeRace) {
      state.activeRace.horsePositions = positions
    }
  },
  SET_RACE_RUNNING(state: RacingState, running: boolean) {
    state.isRunning = running
  },
  ADD_FINISHED_RACE(state: RacingState, race: RaceProgram) {
    state.finishedRaces = [...state.finishedRaces, race].sort((a, b) => {
      const indexA = a.programIndex ?? 0
      const indexB = b.programIndex ?? 0
      return indexA - indexB
    })
  },
  CLEAR_ACTIVE_RACE(state: RacingState) {
    state.activeRace = null
  },
  CLEAR_FINISHED_RACES(state: RacingState) {
    state.finishedRaces = []
  },
  RESET_RACE_STATE(state: RacingState) {
    state.activeRace = null
    state.finishedRaces = []
    state.isRunning = false
  },
}

const actions = {
  setHorseList({ commit }: { commit: Commit }, _horses: Horse[]) {
    commit('SET_HORSE_LIST', _horses)
  },
  setProgram({ commit }: { commit: Commit }, _programs: RaceProgram[]) {
    commit('RESET_RACE_STATE')
    commit('SET_PROGRAM', _programs)
    if (_programs.length > 0) {
      const firstProgram = _programs[0]!
      const activeRace: ActiveRace = {
        programIndex: 0,
        program: firstProgram,
        horsePositions: firstProgram.horses.map((h) => ({
          horseId: h.horse.id,
          position: 0,
        })),
      }
      commit('SET_ACTIVE_RACE', activeRace)
      commit('SET_RACE_RUNNING', false)
    }
  },
  startRace({ commit, state }: { commit: Commit; state: RacingState }, programIndex: number) {
    const programs = state.programs
    if (programIndex >= programs.length) return

    const program = programs[programIndex]!
    const activeRace: ActiveRace = {
      programIndex,
      program,
      horsePositions: program.horses.map((h) => ({
        horseId: h.horse.id,
        position: 0,
      })),
    }
    commit('SET_ACTIVE_RACE', activeRace)
    commit('SET_RACE_RUNNING', true)
  },
  updateRacePositions({ commit }: { commit: Commit }, positions: HorsePosition[]) {
    commit('UPDATE_RACE_POSITIONS', positions)
  },
  finishRace({ commit }: { commit: Commit }, finishedProgram: RaceProgram) {
    commit('ADD_FINISHED_RACE', finishedProgram)
    commit('CLEAR_ACTIVE_RACE')
    commit('SET_RACE_RUNNING', false)
  },
  stopRace({ commit }: { commit: Commit }) {
    commit('SET_RACE_RUNNING', false)
  },
  resumeRace({ commit }: { commit: Commit }) {
    commit('SET_RACE_RUNNING', true)
  },
}

export const racingModule: Module<RacingState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
