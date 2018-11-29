export default token => {
  localStorage.setItem("media-server-token", token.toString());
};
