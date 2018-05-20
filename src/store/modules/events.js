import { generateId } from "@/lib/helpers";

import image1 from "@/assets/images/event1.jpg";
import image2 from "@/assets/images/event2.png";
import image3 from "@/assets/images/event3.png";
import image4 from "@/assets/images/event4.png";

const state = {
  events: [
    {
      title: "8. Alumni Stammtisch",
      image: image1,
      location: "Schäbige Eckkneipe in Lehe",
      usergroup: "Alumni",
      date: new Date(),
      id: generateId(),
      attending: undefined
    },
    {
      title: "Show Your Work!",
      image: image4,
      location: "Schäbige Eckkneipe in Lehe",
      usergroup: "Alle",
      date: new Date(),
      id: generateId(),
      attending: undefined
    },
    {
      title: "Bremerhaven läuft!",
      image: image3,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Alle",
      date: new Date(),
      id: generateId(),
      attending: true
    },
    {
      title: "Seminargruppe 4",
      image: image2,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Studierende",
      date: new Date(),
      id: generateId(),
      attending: undefined
    },
    {
      title: "AstA Event vom Feinsten",
      image: image4,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Studierende",
      date: new Date(),
      id: generateId(),
      attending: false
    },
    {
      title: "Middenmang",
      image: image2,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Dozenten",
      date: new Date(),
      id: generateId(),
      attending: undefined
    },
    {
      title: "FIFA Fußball WM 2018",
      image: image1,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Die ganze Welt",
      date: new Date(),
      id: generateId(),
      attending: true
    }
  ]
};

const mutations = {
  attendEvent: (state, id) => (state.events.find(event => event.id === id).attending = true),
  dontAttendEvent: (state, id) => (state.events.find(event => event.id === id).attending = false),
  resetAttendingState: (state, id) => (state.events.find(event => event.id === id).attending = undefined)
};

const actions = {
  setAttendingState({ commit, state }, { id, value: next }) {
    const previous = state.events.find(event => event.id === id).attending;
    if (next === true && previous !== true) commit("attendEvent", id);
    else if (next === false && previous !== false) commit("dontAttendEvent", id);
    else commit("resetAttendingState", id);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
