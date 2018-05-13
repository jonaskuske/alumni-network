export const checkAuthentication = () =>
  sessionStorage.getItem("gis-alumni-auth") !== null;
