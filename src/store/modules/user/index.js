import profilePicture from "@/assets/images/jonas.jpg";
import headerImage from "@/assets/images/profile-header.jpg";

import { ADD_USERS, ADD_USER, SET_CURRENT_USER } from "./types";

const state = {
  name: "Jonas Kuske",
  username: "jonaskuske",
  profilePicture,
  headerImage,
  users: [],
  currentUser: "jonaskuske"
};
const mutations = {
  [ADD_USER]: ({ users }, user) => users.push(user),
  [ADD_USERS]: ({ users }, newUsers) => users.push(...newUsers),
  [SET_CURRENT_USER]: (state, username) => (state.currentUser = username)
};
const actions = {
  [ADD_USER]({ commit }, user) {
    commit(ADD_USER, user);
  },
  [ADD_USERS]({ commit }, users) {
    Array.isArray(users) && commit(ADD_USERS, users);
  },
  [SET_CURRENT_USER]({ commit }, username) {
    commit(SET_CURRENT_USER, username);
  }
};
const getters = {
  currentUser: ({ currentUser }, { usersByUsername }) => usersByUsername[currentUser] || {},
  usersByUsername: ({ users }) => {
    if (!users.length) return {};

    return users.reduce((obj, user) => {
      obj[user.username] = user;
      return obj;
    }, {});
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
