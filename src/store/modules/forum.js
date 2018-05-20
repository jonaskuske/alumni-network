import { generateId } from "@/lib/helpers";

import forum1 from "@/assets/images/forum1.png";
import forum2 from "@/assets/images/forum2.png";
import forum3 from "@/assets/images/forum3.png";

const state = {
  posts: [
    {
      title: "DMP-Day Plakatauswertung",
      image: forum1,
      author: "Andreas Teufel",
      usergroup: "Studierende",
      date: new Date(),
      read: false,
      id: generateId(),
      comments: []
    },
    {
      title: "#Caturday! Bilder von euren Haustieren hier her!",
      image: forum2,
      author: "Lisa Wengel",
      usergroup: "Alle",
      date: new Date(),
      read: true,
      id: generateId(),
      comments: ["", "", "", "", "", "", "", "", ""]
    },
    {
      title: "Showcase April: Woran habt ihr im letzten Monat gearbeitet?",
      image: forum3,
      author: "Matthias Wengert",
      usergroup: "Alumni",
      date: new Date(),
      read: false,
      id: generateId(),
      comments: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    }
  ]
};

const mutations = {
  markAsRead: (state, id) => (state.posts.find(post => post.id === id).read = true),
  markAsUnread: (state, id) => (state.posts.find(post => post.id === id).read = false)
};

const actions = {
  toggleReadState({ commit, state }, { id }) {
    const read = state.posts.find(post => post.id === id).read;
    commit(read ? "markAsUnread" : "markAsRead", id);
  }
};

const getters = {
  postById() { }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
