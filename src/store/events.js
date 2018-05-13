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
      attending: undefined
    },
    {
      title: "Show Your Work!",
      image: image4,
      usergroup: "Alle",
      date: new Date(),
      attending: undefined
    },
    {
      title: "Bremerhaven läuft!",
      image: image3,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Alle",
      date: new Date(),
      attending: true
    },
    {
      title: "Seminargruppe 4",
      image: image2,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Studierende",
      date: new Date(),
      attending: undefined
    },
    {
      title: "AstA Event vom Feinsten",
      image: image4,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Studierende",
      date: new Date(),
      attending: false
    },
    {
      title: "Middenmang",
      image: image2,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Dozenten",
      date: new Date(),
      attending: undefined
    },
    {
      title: "FIFA Fußball WM 2018",
      image: image1,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Die ganze Welt",
      date: new Date(),
      attending: true
    }
  ]
};

const mutations = {
  attendEvent: (state, index) => (state.events[index].attending = true),
  dontAttendEvent: (state, index) => (state.events[index].attending = false),
  resetAttendingState: (state, index) => (state.events[index].attending = undefined)
};

const actions = {
  setAttendingState({ commit, state }, { index: i, value: next }) {
    const previous = state.events[i].attending;
    if (next === true && previous !== true) commit("attendEvent", i);
    else if (next === false && previous !== false) commit("dontAttendEvent", i);
    else commit("resetAttendingState", i);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
