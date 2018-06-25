import { MARK_ALL_AS_READ } from '@/store/modules/messages/types'

const state = {
  messages: [
    {
      text: 'Eine Testnachricht',
      read: false,
      from: 'Matthias',
    },
    {
      text: 'Eine Testnachricht',
      read: true,
      from: 'Matthias',
    },
    {
      text: 'Eine Testnachricht',
      read: false,
      from: 'Matthias',
    },
    {
      text: 'Eine Testnachricht',
      read: false,
      from: 'Matthias',
    },
    {
      text: 'Eine Testnachricht',
      read: true,
      from: 'Matthias',
    },
    {
      text: 'Eine Testnachricht',
      read: false,
      from: 'Matthias',
    },
  ],
}

const mutations = {
  [MARK_ALL_AS_READ]: ({ messages }) => messages.forEach(m => (m.read = true)),
}

const actions = {
  [MARK_ALL_AS_READ]({ commit }) {
    commit(MARK_ALL_AS_READ)
  },
}

const getters = {
  unreadMessages(state) {
    return state.messages.filter(msg => !msg.read)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
