import { showGenericMessageModal } from "./modalController";
import verifyAndRedirectToDashboard from "./verifyAndRedirectToDashboard";
import saveCredentialsToStorage from "./saveCredentialsToStorage";
import { showLoadingGif, hideLoadingGif } from "./loadingGifController";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", e => {
  e.preventDefault();

  const userCredentials = {
    email: emailInput.value.toString(),
    password: passwordInput.value.toString()
  };

  showLoadingGif();
  fetch(`${process.env.SERVER_URL}/auth`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userCredentials)
  })
    .then(res => res.json())
    .then(data => {
      hideLoadingGif();
      if (data.error) {
        showGenericMessageModal(data.error);
      }
      if (data.message) {
        saveCredentialsToStorage(data);
        showGenericMessageModal(data.message);
        verifyAndRedirectToDashboard();
      }
    })
    .catch(err => {
      console.log(err);
      hideLoadingGif();
      showGenericMessageModal(
        "Could not connect to server :("
      );
    });
});
