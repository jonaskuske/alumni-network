const authState = {
  authenticated: false
};

export const checkAuth = () => {
  return (
    authState.authenticated ||
    (authState.authenticated = sessionStorage.getItem("gis-alumni-auth") !== null)
  );
};

export const revokeAuth = () => {
  sessionStorage.removeItem("gis-alumni-auth");
};

export const createAuth = user => {
  sessionStorage.setItem("gis-alumni-auth", user);
};

export const login = (user, password) => {
  if (user && password) {
    createAuth(user);
    return (authState.authenticated = true);
  }

  return false;
};

export const logout = () => {
  revokeAuth();
  authState.authenticated = false;
};
