import { showModalMessage } from "./modalController";
import verifyAndRedirectToDashboard from "./verifyAndRedirectToDashboard";
import saveCredentialsToStorage from "./saveCredentialsToStorage";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const submitBtn = document.getElementById("submit-btn");

let dataIsValid = false;

const doClientSideValidation = (email, password, confirmedPassword) => {
  if (!email) {
    showModalMessage(`Email is empty.`);
    dataIsValid = false;
  } else if (!password) {
    showModalMessage(`Password is empty`);
    dataIsValid = false;
  } else if (!confirmedPassword) {
    showModalMessage(`Confirm your password`);
    dataIsValid = false;
  } else if (password.toString() !== confirmedPassword.toString()) {
    showModalMessage(`Passwords don't match.`);
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

    fetch("http://localhost:8081/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          showModalMessage(data.error);
        }
        if (data.message) {
          showModalMessage(data.message);
          saveCredentialsToStorage(data);
          verifyAndRedirectToDashboard();
        }
      });
  }
});
