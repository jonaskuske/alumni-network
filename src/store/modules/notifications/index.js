import {
  MARK_ALL_AS_READ,
  MARK_AS_READ,
  MARK_AS_UNREAD,
  TOGGLE_READ_STATE,
} from '@/store/modules/notifications/types'

const state = {
  notifications: [
    {
      text: "Neuer Kommentar zu 'DMP-Day Plakatauswertung'!",
      read: false,
      link: '/forum/post/6ed11d9b-1c2a-4ad7-948a-b491467534e1#comments',
    },
    {
      text: 'Testbenachrichtigung',
      read: true,
      link: '/',
    },
    {
      text: "Findet demnächst statt: '8. Alumni Stammtisch'",
      read: false,
      link: '/events/event/05e53bc1-176c-4c6b-be3f-ab943172297b',
    },
    {
      text: 'Testbenachrichtigung',
      read: true,
      link: '/',
    },
    {
      text:
        "Beliebter Beitrag: '#CATURDAY! BILDER VON EUREN HAUSTIEREN HIER HER!'",
      read: false,
      link: '/forum/post/7eab7eb8-aee4-4229-a4ce-867f5e007781',
    },
  ],
}

const mutations = {
  [MARK_AS_READ]: ({ notifications }, index) =>
    (notifications[index].read = true),
  [MARK_AS_UNREAD]: ({ notifications }, index) =>
    (notifications[index].read = false),
  [MARK_ALL_AS_READ]: ({ notifications }) =>
    notifications.forEach(n => (n.read = true)),
}

const actions = {
  [MARK_AS_READ]({ commit, state }, notification) {
    const index = state.notifications.findIndex(n => n === notification)
    commit(MARK_AS_READ, index)
  },
  [MARK_ALL_AS_READ]({ commit }) {
    commit(MARK_ALL_AS_READ)
  },
  [TOGGLE_READ_STATE]({ commit }, notification) {
    const index = state.notifications.findIndex(n => n === notification)
    commit(notification.read ? MARK_AS_UNREAD : MARK_AS_READ, index)
  },
}

const getters = {
  unreadNotifications(state) {
    return state.notifications.filter(notification => !notification.read)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
