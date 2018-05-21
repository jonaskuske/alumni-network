import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "normalize.css";
import "@/assets/style";
import { autofillCatch } from "@/lib/helpers";
import { fetchEvents, fetchPosts } from "@/lib/fetch";
import { ADD_EVENTS } from "@/store/modules/events/types";
import { ADD_POSTS } from "@/store/modules/forum/types";

Vue.config.productionTip = false;

const query = window.matchMedia("(min-width: 900px)");
const queryHandler = query => store.dispatch("setMobileLayout", !query.matches);
queryHandler(query);
query.addListener(queryHandler);

Vue.directive("autofill-catch", autofillCatch);
Vue.filter("date", date => {
  date = new Date(date);
  return date.toLocaleString("de-DE", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
});

export default new Vue({
  router,
  store,
  async beforeCreate() {
    const [events, posts] = await Promise.all([fetchEvents(), fetchPosts()]);
    store.dispatch("eventStore/" + ADD_EVENTS, events);
    store.dispatch("forumStore/" + ADD_POSTS, posts);
  },
  render: create => create(App)
}).$mount("#root");

window.addEventListener("beforeinstallprompt", e => e.preventDefault());
