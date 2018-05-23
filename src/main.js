import "normalize.css";
import "@/assets/style";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueSanitize from "vue-sanitize";
import { fetchEvents, fetchPosts, fetchUsers } from "@/lib/fetch";
import { SET_MOBILE_LAYOUT } from "@/store/types";
import { ADD_EVENTS } from "@/store/modules/events/types";
import { ADD_POSTS } from "@/store/modules/forum/types";
import { ADD_USERS } from "@/store/modules/user/types";

Vue.config.productionTip = false;

const query = window.matchMedia("(min-width: 900px)");
const queryHandler = query => store.dispatch(SET_MOBILE_LAYOUT, !query.matches);
queryHandler(query);
query.addListener(queryHandler);

Vue.use(VueSanitize);

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
  async beforeCreate () {
    const [events, posts, users] = await Promise.all([
      fetchEvents(),
      fetchPosts(),
      fetchUsers()
    ]);
    store.dispatch("eventStore/" + ADD_EVENTS, events);
    store.dispatch("forumStore/" + ADD_POSTS, posts);
    store.dispatch("userStore/" + ADD_USERS, users);
  },
  render: create => create(App)
}).$mount("#root");

window.addEventListener("beforeinstallprompt", e => e.preventDefault());
