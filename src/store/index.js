import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";
import {
  LOGIN,
  LOGOUT,
  TOGGLE_MENU_STATE,
  STORE_NAVIGATION_ORDER,
  SET_MOBILE_LAYOUT,
  SET_MENU_STATE
} from "./types";

import * as auth from "@/lib/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state: {
    navigationOrder: { from: 0, to: 0 },
    mobileLayout: false,
    menuOpen: false
  },
  mutations: {
    [STORE_NAVIGATION_ORDER]: (state, order) => (state.navigationOrder = order),
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
    [STORE_NAVIGATION_ORDER]({ commit }, order) {
      commit(STORE_NAVIGATION_ORDER, order);
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
