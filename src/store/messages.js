const state = {
  messages: [
    {
      text: "Hallo hallo Dosenöffner",
      read: false,
      from: "Matthias"
    },
    {
      text: "Hallo hallo Dosenöffner",
      read: true,
      from: "Matthias"
    },
    {
      text: "Hallo hallo Dosenöffner",
      read: false,
      from: "Matthias"
    },
    {
      text: "Hallo hallo Dosenöffner",
      read: false,
      from: "Matthias"
    },
    {
      text: "Hallo hallo Dosenöffner",
      read: true,
      from: "Matthias"
    },
    {
      text: "Hallo hallo Dosenöffner",
      read: false,
      from: "Matthias"
    }
  ]
};

const getters = {
  unreadMessages(state) {
    return state.messages.filter(msg => !msg.read);
  }
};

export default {
  namespaced: true,
  state,
  getters
};
