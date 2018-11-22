import { renderErrorMessage, renderSuccessMessage } from "./renderMessages";
import storeJwtInLocalStorage from "./storeJwtInLocalStorage";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const submitBtn = document.getElementById("submit-btn");

let dataIsValid = false;

const doClientSideValidation = (email, password, confirmedPassword) => {
  if (!email) {
    renderErrorMessage(`Email is empty.`);
    dataIsValid = false;
  } else if (!password) {
    renderErrorMessage(`Password is empty`);
    dataIsValid = false;
  } else if (!confirmedPassword) {
    renderErrorMessage(`Confirm your password`);
    dataIsValid = false;
  } else if (password.toString() !== confirmedPassword.toString()) {
    renderErrorMessage(`Passwords don't match.`);
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

    fetch("http://localhost:8083/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          renderErrorMessage(data.error);
        }
        if (data.message) {
          renderSuccessMessage(data.message);
          storeJwtInLocalStorage(data.token);
        }
      });
  }
});
