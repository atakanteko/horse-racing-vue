import type { Module, Commit } from 'vuex'
import type { RootState } from '@/types/store/store'
import type { Horse } from '@/types/store/racing'

export interface RacingState {
  horses: Horse[]
}

const state: RacingState = {
  horses: [],
}

const getters = {
  getHorses: (state: RacingState) => state.horses,
}

const mutations = {
  SET_HORSE_LIST(state: RacingState, horses: Horse[]) {
    state.horses = horses
  },
}

const actions = {
  setHorseList({ commit }: { commit: Commit }, _horses: Horse[]) {
    commit('SET_HORSE_LIST', _horses)
  },
}

export const racingModule: Module<RacingState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
