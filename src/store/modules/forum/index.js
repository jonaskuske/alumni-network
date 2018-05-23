import Vue from "vue";
import {
  ADD_POST,
  ADD_POSTS,
  REPLACE_POST,
  TOGGLE_READ_STATE,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

const state = {
  posts: []
};

const mutations = {
  [ADD_POST]: ({ posts }, post) => posts.push(post),
  [ADD_POSTS]: ({ posts }, newPosts) => posts.push(...newPosts),
  [REPLACE_POST]: ({ posts }, { index, post }) => Vue.set(posts, index, post),
  [DELETE_POST]: ({ posts }, index) => posts.splice(index, 1),
  [MARK_AS_READ]: ({ posts }, index) => (posts[index].read = true),
  [MARK_AS_UNREAD]: ({ posts }, index) => (posts[index].read = false),
  [ADD_COMMENT]: ({ posts }, { index, comment }) => posts[index].comments.push(comment),
  [REMOVE_COMMENT]: ({ posts }, { postIndex, index }) => posts[postIndex].comments.splice(index, 1)
};

const actions = {
  [ADD_POST] ({ commit }, post) {
    commit(ADD_POST, post);
  },
  [ADD_POSTS] ({ commit }, posts) {
    Array.isArray(posts) && commit(ADD_POSTS, posts);
  },
  [REPLACE_POST] ({ commit, getters }, post) {
    const index = getters.getPostIndexById(post.id);
    commit(REPLACE_POST, { index, post });
  },
  [DELETE_POST] ({ commit, getters }, id) {
    const index = getters.getPostIndexById(id);
    commit(DELETE_POST, index);
  },
  [MARK_AS_READ] ({ commit, getters }, { id }) {
    const index = getters.getPostIndexById(id);
    commit(MARK_AS_READ, index);
  },
  [MARK_AS_UNREAD] ({ commit, getters }, { id }) {
    const index = getters.getPostIndexById(id);
    commit(MARK_AS_UNREAD, index);
  },
  [TOGGLE_READ_STATE] ({ commit, getters }, { id }) {
    const read = getters.getPostById(id).read;
    const index = getters.getPostIndexById(id);
    commit(read ? MARK_AS_UNREAD : MARK_AS_READ, index);
  },
  [ADD_COMMENT] ({ commit, getters }, { id, comment }) {
    const index = getters.getPostIndexById(id);
    commit(ADD_COMMENT, { index, comment });
  },
  [REMOVE_COMMENT] ({ commit, getters }, { id, index }) {
    const postIndex = getters.getPostIndexById(id);
    commit(REMOVE_COMMENT, { postIndex, index });
  }
};

const getters = {
  getPostById: ({ posts }) => id => posts.find(post => post.id === id),
  getPostIndexById: ({ posts }) => id => posts.findIndex(post => post.id === id),
  postsSortedByOldest: ({ posts }) => posts.sort((a, b) => a.date > b.date),
  postsSortedByNewest: ({ posts }) => posts.sort((a, b) => a.date < b.date),
  postsByUsername: ({ posts }) => {
    if (!posts.length) return {};

    return posts.reduce((obj, post) => {
      Array.isArray(obj[post.username])
        ? obj[post.username].push(post)
        : (obj[post.username] = [post]);
      return obj;
    }, {});
  },
  postsById: ({ posts }) => {
    if (!posts.length) return {};

    return posts.reduce((obj, post) => {
      obj[post.id] = post;
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
