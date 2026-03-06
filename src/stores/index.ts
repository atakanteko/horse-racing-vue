import { createStore } from 'vuex'
import type { RootState } from '@/types/store/store'
import { racingModule } from './modules/racing'

export const store = createStore<RootState>({
  strict: import.meta.env.MODE !== 'production',

  modules: {
    racing: racingModule,
  },

  state: {
    appName: 'Horse Racing',
  },

  getters: {
    appName: (state: RootState) => state.appName,
  },

  mutations: {
    SET_APP_NAME(state: RootState, name: string) {
      state.appName = name
    },
  },

  actions: {
    setAppName({ commit }: { commit: (type: string, payload?: string) => void }, name: string) {
      commit('SET_APP_NAME', name)
    },
  },
})

export default store
