import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";
import {
  LOGIN,
  LOGOUT,
  TOGGLE_MENU_STATE,
  SET_MOBILE_LAYOUT,
  SET_MENU_STATE
} from "./types";

import * as auth from "@/lib/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state: {
    mobileLayout: false,
    menuOpen: false
  },
  mutations: {
    [SET_MOBILE_LAYOUT]: (state, value) => (state.mobileLayout = value),
    [SET_MENU_STATE]: (state, value) => (state.menuOpen = value)
  },
  actions: {
    [LOGIN]() {
      auth.createAuth();
    },
    [LOGOUT]() {
      auth.revokeAuth();
    },
    [SET_MOBILE_LAYOUT]({ commit }, value) {
      commit(SET_MOBILE_LAYOUT, value);
      commit(SET_MENU_STATE, !value);
    },
    [TOGGLE_MENU_STATE]({ state, commit }) {
      commit(SET_MENU_STATE, !state.menuOpen);
    }
  }
});
