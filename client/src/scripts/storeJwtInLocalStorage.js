export const storeJwtInLocalStorage = token => {
  localStorage.setItem("media-server-token", token.toString());
};
