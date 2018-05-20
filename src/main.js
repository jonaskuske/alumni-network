import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "normalize.css";
import "@/assets/style";
import { autofillCatch } from "@/lib/helpers";

Vue.config.productionTip = false;

const query = window.matchMedia("(min-width: 900px)");
const queryHandler = query => store.dispatch("setMobileLayout", !query.matches);
queryHandler(query);
query.addListener(queryHandler);

Vue.directive("autofill-catch", autofillCatch);
Vue.filter(
  "date",
  date =>
    date.toLocaleString &&
    date.toLocaleString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
);

new Vue({
  router,
  store,
  render: create => create(App)
}).$mount("#root");

window.addEventListener("beforeinstallprompt", e => e.preventDefault());
