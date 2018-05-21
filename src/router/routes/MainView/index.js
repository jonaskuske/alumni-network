import Forum from "@/views/MainView/Forum/Forum";
import Events from "@/views/MainView/Events/Events";
import Profile from "@/views/MainView/Profile";
import Overview from "@/views/MainView/Overview";
import Contacts from "@/views/MainView/Contacts";
import Jobs from "@/views/MainView/Jobs";
import ConstructionNotice from "@/views/MainView/ConstructionNotice";

import forumRoutes from "./forum";
import eventRoutes from "./events";

const routes = [
  {
    path: "",
    name: "home",
    alias: ["home"],
    component: Overview
  },
  {
    path: "forum",
    alias: ["posts"],
    component: Forum,
    children: forumRoutes
  },
  {
    path: "events",
    alias: ["veranstaltungen"],
    component: Events,
    children: eventRoutes
  },
  {
    path: "kontakte",
    alias: ["netzwerk", "people"],
    component: Contacts
  },
  {
    path: "jobs",
    component: Jobs
  },
  {
    path: "me",
    component: Profile
  },
  {
    path: "*",
    component: ConstructionNotice
  }
];

/**
 * Assign index to all routes' or their default child routes' name props
 * Later used to determine in which 'direction' the navigation moving
 */
const routesWithNavOrder = routes.map((route, index) => {
  if (!route.children) return { meta: { index }, ...route };

  route.children.find(childroute => childroute.path === "").meta = { index };
  return route;
});

export default routesWithNavOrder;
