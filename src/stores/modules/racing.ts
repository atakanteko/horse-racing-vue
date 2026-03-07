import type { Module, Commit } from 'vuex'
import type { RootState } from '@/types/store/store'
import type { Horse, RaceProgram } from '@/types/store/racing'

export interface RacingState {
  horses: Horse[]
  programs: RaceProgram[]
}

const state: RacingState = {
  horses: [],
  programs: [],
}

const getters = {
  getHorses: (state: RacingState) => state.horses,
  getPrograms: (state: RacingState) => state.programs,
}

const mutations = {
  SET_HORSE_LIST(state: RacingState, horses: Horse[]) {
    state.horses = horses
  },
  SET_PROGRAM(state: RacingState, programs: RaceProgram[]) {
    state.programs = programs
  },
}

const actions = {
  setHorseList({ commit }: { commit: Commit }, _horses: Horse[]) {
    commit('SET_HORSE_LIST', _horses)
  },
  setProgram({ commit }: { commit: Commit }, _programs: RaceProgram[]) {
    commit('SET_PROGRAM', _programs)
  },
}

export const racingModule: Module<RacingState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
