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
      comments: ["", "", ""]
    },
    {
      title: "#Caturday! Bilder von euren Haustieren hier her!",
      image: forum2,
      author: "Lisa Wengel",
      usergroup: "Alle",
      date: new Date(),
      read: true,
      comments: ["", "", "", "", "", "", "", "", ""]
    },
    {
      title: "Showcase April: Woran habt ihr im letzten Monat gearbeitet?",
      image: forum3,
      author: "Matthias Wengert",
      usergroup: "Alumni",
      date: new Date(),
      read: false,
      comments: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    }
  ]
};

const mutations = {
  markAsRead: (state, index) => (state.posts[index].read = true),
  markAsUnread: (state, index) => (state.posts[index].read = false)
};

const actions = {
  toggleReadState({ commit, state }, { index }) {
    const read = state.posts[index].read;
    commit(read ? "markAsUnread" : "markAsRead", index);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
