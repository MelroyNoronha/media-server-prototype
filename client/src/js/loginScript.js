import { renderErrorMessage, renderSuccessMessage } from "./renderMessages";
import verifyAndRedirectToDashboard from "./verifyAndRedirectToDashboard";

const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", e => {
  e.preventDefault();

  const userCredentials = {
    email: emailInput.value.toString(),
    password: passwordInput.value.toString()
  };

  fetch("http://localhost:8083/auth", {
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
        localStorage.setItem("media-server-token", data.token.toString());
        renderSuccessMessage(data.message);
        verifyAndRedirectToDashboard();
      }
    });
});
