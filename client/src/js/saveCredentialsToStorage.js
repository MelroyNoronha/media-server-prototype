const saveCredentialsToStorage = data => {
  localStorage.setItem("media-server-token", data.token);
  localStorage.setItem("media-server-email", data.email);
};

export default saveCredentialsToStorage;
