import { ADD_EVENTS, SET_ATTENDING_STATE } from "./types";

const state = {
  events: []
};

const mutations = {
  addEvents: ({ events }, newEvents) => events.push(...newEvents),
  attendEvent: ({ events }, i) => (events[i].attending = true),
  dontAttendEvent: ({ events }, i) => (events[i].attending = false),
  resetAttendingState: ({ events }, i) => (events[i].attending = undefined)
};

const actions = {
  [ADD_EVENTS]({ commit }, events) {
    Array.isArray(events) && commit("addEvents", events);
  },
  [SET_ATTENDING_STATE]({ commit, getters }, { id, value }) {
    const previousValue = getters.eventsById[id].attending;
    const index = getters.getEventIndexById(id);
    if (previousValue !== value || previousValue === undefined) {
      commit(value ? "attendEvent" : "dontAttendEvent", index);
    } else commit("resetAttendingState", index);
  }
};

const getters = {
  getEventById: ({ events }) => id => events.find(event => event.id === id),
  getEventIndexById: ({ events }) => id => events.findIndex(event => event.id === id),
  eventsSortedByOldest: ({ events }) => events.sort((a, b) => a.date > b.date),
  eventsSortedByNewest: ({ events }) => events.sort((a, b) => a.date < b.date),
  eventsByUsername: ({ events }) => {
    if (!events.length) return {};

    return events.reduce((obj, event) => {
      Array.isArray(obj[event.username])
        ? obj[event.username].push(event)
        : (obj[event.username] = [event]);
      return obj;
    }, {});
  },
  eventsById: ({ events }) => {
    if (!events.length) return {};

    return events.reduce((obj, event) => {
      obj[event.id] = event;
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
