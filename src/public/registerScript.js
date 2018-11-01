const form = document.getElementById("form");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const submitBtn = document.getElementById("submit-btn");
const alertDiv = document.getElementById("alert-div");

const renderErrMessage = errMessage => {
  errMessage = errMessage.toString();
  alertDiv.innerHTML = ``;
  alertDiv.innerHTML = `
      <p class="alert-error"><strong>Error:</strong> ${errMessage}</p>
    `;
};

const renderSuccessMessage = successMessage => {
  successMessage = successMessage.toString();
  alertDiv.innerHTM = ``;
  alertDiv.innerHTML = `
      <p class="alert-success"><strong>Success:</strong> ${successMessage}</p>
    `;
};

const passwordsDoMatch = (password1, password2) =>
  password1.toString() === password2.toString() ? true : false;

let dataIsValidated = false;

const doClientSideValidation = (username, password, confirmedPassword) => {
  if (!username) {
    renderErrMessage(`Username is empty.`);
  } else if (!password) {
    renderErrMessage(`Password is empty`);
  } else if (!confirmedPassword) {
    renderErrMessage(`Confirm your password`);
  } else if (!passwordsDoMatch(password, confirmedPassword)) {
    renderErrMessage(`Passwords don't match.`);
  }

  if (username && password && confirmedPassword && passwordsDoMatch) {
    dataIsValidated = true;
  }
};

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const username = usernameInput.value.toString();
  const password = passwordInput.value.toString();
  const confirmedPassword = confirmPasswordInput.value.toString();

  doClientSideValidation(username, password, confirmedPassword);
  if (dataIsValidated) {
    let userCredentials = {
      username: username,
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
          renderErrMessage(data.error);
        }
        if (data.message) {
          renderSuccessMessage(data.message);
        }
      });
  }
});
