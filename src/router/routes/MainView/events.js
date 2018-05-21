import Overview from "@/views/MainView/Events/Overview";
import ViewEvent from "@/views/MainView/Events/ViewEvent";

export default [
  {
    path: "",
    component: Overview
  },
  {
    path: "event/:id",
    alias: ["veranstaltung/:id"],
    component: ViewEvent,
    props: true
  }
];
