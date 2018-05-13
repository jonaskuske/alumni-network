const state = {
  notifications: [
    {
      text: "New notification blubbla",
      read: true,
      link: "hullahulla"
    },
    {
      text: "New notification blubbla",
      read: true,
      link: "hullahulla"
    },
    {
      text: "New notification blubbla",
      read: false,
      link: "hullahulla"
    },
    {
      text: "New notification blubbla",
      read: true,
      link: "hullahulla"
    },
    {
      text: "New notification blubbla",
      read: false,
      link: "hullahulla"
    }
  ]
};

const getters = {
  unreadNotifications(state) {
    return state.notifications.filter(notification => !notification.read);
  }
};

export default {
  namespaced: true,
  state,
  getters
};
