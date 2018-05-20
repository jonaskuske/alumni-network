export const checkAuthentication = () => {
  return sessionStorage.getItem("gis-alumni-auth") !== null;
};

export const revokeAuthentication = () => {
  sessionStorage.removeItem("gis-alumni-auth");
  return sessionStorage.getItem("gis-alumni-auth") === null;
};
