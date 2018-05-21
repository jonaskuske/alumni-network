import Overview from "@/views/MainView/Forum/Overview";
import CreatePost from "@/views/MainView/Forum/CreatePost";
import EditPost from "@/views/MainView/Forum/EditPost";
import ViewPost from "@/views/MainView/Forum/ViewPost";

export default [
  {
    path: "",
    component: Overview
  },
  {
    path: "create",
    alias: ["new", "submit"],
    component: CreatePost
  },
  {
    path: "post/:id",
    component: ViewPost,
    props: true
  },
  {
    path: "post/:id/edit",
    component: EditPost,
    props: true
  }
];
