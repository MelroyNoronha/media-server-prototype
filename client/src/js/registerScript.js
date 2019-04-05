import { showGenericMessageModal } from "./modalController";
import { showLoadingGif, hideLoadingGif } from "./loadingGifController";
import verifyAndRedirectToDashboard from "./verifyAndRedirectToDashboard";
import saveCredentialsToStorage from "./saveCredentialsToStorage";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const submitBtn = document.getElementById("submit-btn");

let dataIsValid = false;

const doClientSideValidation = (email, password, confirmedPassword) => {
  if (!email) {
    showGenericMessageModal(`Email is empty.`);
    dataIsValid = false;
  } else if (!password) {
    showGenericMessageModal(`Password is empty`);
    dataIsValid = false;
  } else if (!confirmedPassword) {
    showGenericMessageModal(`Confirm your password`);
    dataIsValid = false;
  } else if (password.toString() !== confirmedPassword.toString()) {
    showGenericMessageModal(`Passwords don't match.`);
    dataIsValid = false;
  } else {
    dataIsValid = true;
  }
};

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const email = emailInput.value.toString();
  const password = passwordInput.value.toString();
  const confirmedPassword = confirmPasswordInput.value.toString();

  doClientSideValidation(email, password, confirmedPassword);

  if (dataIsValid) {
    let userCredentials = {
      email: email,
      password: password
    };

    showLoadingGif();
    fetch(`${process.env.SERVER_URL}/register`, {
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
          showGenericMessageModal(data.message);
          saveCredentialsToStorage(data);
          verifyAndRedirectToDashboard();
        }
      })
      .catch(err => {
        console.err(err);
        hideLoadingGif();
        showGenericMessageModal("Could not connect to server :(");
      });
  }
});
