import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";

import { wait } from "@/lib/helpers";
import store from "@/store";
import { STORE_NAVIGATION_ORDER } from "@/store/types";

Vue.use(Router);

const router = new Router({
  routes,
  mode: "history",
  scrollBehavior: (to, from, saved) => saved || { x: 0, y: 0 }
});

router.beforeEach(({ meta: to }, { meta: from }, next) => {
  store.dispatch(STORE_NAVIGATION_ORDER, { from: from.index, to: to.index });
  next();
});

router.afterEach(async ({ hash }) => {
  if (hash) {
    await wait(350);
    const target = document.querySelector(hash);
    target && target.scrollIntoView({ behavior: "smooth" });
  }
});

export default router;
