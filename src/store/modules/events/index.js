import Vue from "vue";
import {
  ADD_EVENTS,
  SET_ATTENDING_STATE,
  ADD_EVENT,
  REPLACE_EVENT,
  DELETE_EVENT,
  RESET_ATTENDING_STATE
} from "./types";

const state = {
  events: []
};

const mutations = {
  [ADD_EVENT]: ({ events }, event) => events.push(event),
  [ADD_EVENTS]: ({ events }, newEvents) => events.push(...newEvents),
  [REPLACE_EVENT]: ({ events }, { index, event }) => Vue.set(events, index, event),
  [DELETE_EVENT]: ({ events }, index) => events.splice(index, 1),
  [SET_ATTENDING_STATE]: ({ events }, { index, value }) => (events[index].attending = value),
  [RESET_ATTENDING_STATE]: ({ events }, i) => (events[i].attending = undefined)
};

const actions = {
  [ADD_EVENT]({ commit }, event) {
    commit(ADD_EVENT, event);
  },
  [ADD_EVENTS]({ commit }, events) {
    Array.isArray(events) && commit("addEvents", events);
  },
  [REPLACE_EVENT]({ commit, getters }, event) {
    const index = getters.getEventIndexById(event.id);
    commit(REPLACE_EVENT, { index, event });
  },
  [DELETE_EVENT]({ commit, getters }, event) {
    const index = getters.getEventIndexById(event.id);
    commit(DELETE_EVENT, index);
  },
  [SET_ATTENDING_STATE]({ commit, getters }, { id, value }) {
    const previousValue = getters.eventsById[id].attending;
    const index = getters.getEventIndexById(id);
    if (previousValue !== value || previousValue === undefined) {
      commit(SET_ATTENDING_STATE, { value, index });
    } else commit(RESET_ATTENDING_STATE, index);
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
