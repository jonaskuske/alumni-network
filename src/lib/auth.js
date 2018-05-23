import store from "@/store";
import { SET_ACTIVE_USER } from "@/store/modules/user/types";

const authState = {
  authenticated: false,
  users: [{ username: "jonaskuske", password: "test123" }]
};

export const checkAuth = () => {
  if (authState.authenticated) return authState.authenticated;
  const token = sessionStorage.getItem("gis-alumni-auth");
  if (token) {
    const [user, password] = token.split("|");
    login(user, password);
  }
  return authState.authenticated;
};

export const revokeAuth = () => {
  sessionStorage.removeItem("gis-alumni-auth");
};

export const createAuth = (user, pw) => {
  sessionStorage.setItem("gis-alumni-auth", `${user}|${pw}`);
};

export const login = (user, pw) => {
  if (authState.users.find(u => u.username === user && u.password === pw)) {
    createAuth(user, pw);
    store.dispatch("userStore/" + SET_ACTIVE_USER, user);
    return (authState.authenticated = true);
  }
  return false;
};

export const logout = () => {
  revokeAuth();
  authState.authenticated = false;
};

export const addCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    if (username && password) {
      authState.users.push({ username, password });
      resolve(username);
    } else reject();
  });
};
