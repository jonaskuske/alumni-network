import Login from "@/views/Splash/Login";
import Signup from "@/views/Splash/Signup";

export default [
  {
    path: "",
    name: "login",
    component: Login
  },
  {
    path: "newuser",
    alias: ["signup"],
    name: "signup",
    component: Signup
  }
];
