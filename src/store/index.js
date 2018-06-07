import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import { TOGGLE_MENU_STATE, SET_MOBILE_LAYOUT, SET_MENU_STATE } from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    mobileLayout: false,
    menuOpen: false,
  },
  mutations: {
    [SET_MOBILE_LAYOUT]: (state, value) => (state.mobileLayout = value),
    [SET_MENU_STATE]: (state, value) => (state.menuOpen = value),
  },
  actions: {
    [SET_MOBILE_LAYOUT]({ commit }, value) {
      commit(SET_MOBILE_LAYOUT, value)
      commit(SET_MENU_STATE, !value) // default: closed on mobile, open on desktop
    },
    [TOGGLE_MENU_STATE]({ state, commit }) {
      commit(SET_MENU_STATE, !state.menuOpen)
    },
    [SET_MENU_STATE]({ commit }, value) {
      commit(SET_MENU_STATE, value)
    },
  },
})
