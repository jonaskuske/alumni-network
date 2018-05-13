import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import { checkAuthentication } from "@/lib/auth";

import Splash from "./views/Splash";
import Login from "./views/Login";
import Signup from "./views/Signup";
import MainView from "./views/MainView";
const Overview = () => import("./views/Overview");
const Events = () => import("./views/Events");
const Forum = () => import("./views/Forum");
const Contacts = () => import("./views/Contacts");
const Jobs = () => import("./views/Jobs");
const ConstructionNotice = () => import("./views/ConstructionNotice");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: Splash,
      children: [
        {
          path: "",
          name: "login",
          component: Login
        },
        {
          path: "newuser",
          name: "signup",
          component: Signup
        }
      ],
      beforeEnter(from, to, next) {
        const storeAuth = store.state.authenticated;
        const sessionAuth = checkAuthentication();
        if (storeAuth || sessionAuth) next("/");
        else next();
      }
    },
    {
      path: "/",
      component: MainView,
      children: [
        {
          path: "",
          name: 0,
          alias: ["home"],
          component: Overview
        },
        {
          path: "forum",
          alias: ["posts"],
          name: 1,
          component: Forum
        },
        {
          path: "veranstaltungen",
          alias: ["events", "termine"],
          name: 2,
          component: Events
        },
        {
          path: "kontakte",
          alias: ["netzwerk", "people"],
          name: 3,
          component: Contacts
        },
        {
          path: "jobs",
          name: 4,
          component: Jobs
        },
        {
          path: "*",
          component: ConstructionNotice,
          name: 5
        }
      ],
      beforeEnter(from, to, next) {
        const storeAuth = store.state.authenticated;
        const sessionAuth = checkAuthentication();
        if (storeAuth || sessionAuth) next();
        else next("/login");
      }
    }
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    return { x: 0, y: 0 };
  }
});

router.beforeEach(({ name: to }, { name: from }, next) => {
  store.commit("setNavPositions", { from, to });
  next();
});

export default router;
