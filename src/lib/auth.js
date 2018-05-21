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
  authState.authenticated = false;
};

export const createAuth = () => {
  sessionStorage.setItem("gis-alumni-auth", true);
  authState.authenticated = true;
};
