import Vue from "vue";
import Vuex from "vuex";

import eventStore from "./events";
import forumStore from "./forum";
import messageStore from "./messages";
import notificationStore from "./notifications";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticated: false,
    user: {},
    navPositions: { from: 0, to: 0 },
    mobileLayout: false,
    menuOpen: false
  },
  mutations: {
    login: state => (state.authenticated = true),
    logout: state => (state.authenticated = false),
    setNavPositions: (state, pos) => (state.navPositions = pos),
    enableMobileLayout: state => (state.mobileLayout = true),
    disableMobileLayout: state => (state.mobileLayout = false),
    setMenuState: (state, value) => (state.menuOpen = value)
  },
  actions: {
    login({ commit }) {
      sessionStorage.setItem("gis-alumni-auth", true);
      commit("login");
    },
    logout({ commit }) {
      sessionStorage.removeItem("gis-alumni-auth");
      commit("logout");
    },
    setMobileLayout({ commit }, value) {
      if (value) {
        commit("setMenuState", false);
        commit("enableMobileLayout");
      } else {
        commit("setMenuState", true);
        commit("disableMobileLayout");
      }
    },
    toggleMenu({ state, commit }) {
      state.menuOpen
        ? commit("setMenuState", false)
        : commit("setMenuState", true);
    }
  },
  modules: {
    eventStore,
    forumStore,
    messageStore,
    notificationStore
  }
});
