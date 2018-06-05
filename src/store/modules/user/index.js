import * as auth from "@/lib/auth";
import {
  ADD_USERS,
  ADD_USER,
  SET_ACTIVE_USER,
  REGISTER_NEW_USER,
  SET_PROFILE_PICTURE
} from "./types";

const state = {
  users: [],
  currentUser: ""
};
const mutations = {
  [ADD_USER]: ({ users }, user) => users.push(user),
  [ADD_USERS]: ({ users }, newUsers) => users.push(...newUsers),
  [SET_PROFILE_PICTURE]: ({ users }, { index, picture }) => users[index].profilePicture = picture,
  [SET_ACTIVE_USER]: (state, username) => (state.currentUser = username)
};
const actions = {
  [ADD_USER] ({ commit }, user) {
    commit(ADD_USER, user);
  },
  [ADD_USERS] ({ commit }, users) {
    Array.isArray(users) && commit(ADD_USERS, users);
  },
  [SET_PROFILE_PICTURE] ({ commit, getters }, { username, picture }) {
    username = username || getters.currentUser.username;
    const index = getters.userIndexByUsername(username);
    commit(SET_PROFILE_PICTURE, { index, picture });
  },
  [SET_ACTIVE_USER] ({ commit }, username) {
    commit(SET_ACTIVE_USER, username);
  },
  [REGISTER_NEW_USER] ({ commit }, user) {
    return new Promise((res, rej) => {
      if (user.username && user.name && user.password) {
        auth.addCredentials(user.username, user.password).then(username => {
          commit(ADD_USER, user);
          commit(SET_ACTIVE_USER, username);
          res(username);
        });
      } else rej();
    });
  }
};
const getters = {
  currentUser: ({ currentUser }, { usersByUsername }) => usersByUsername[currentUser] || {},
  userIndexByUsername: ({ users }) => username => users.findIndex(user => user.username === username),
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
