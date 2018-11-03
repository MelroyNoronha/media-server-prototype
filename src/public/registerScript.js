const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
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

let dataIsValid = false;

const doClientSideValidation = (email, password, confirmedPassword) => {
  if (!email) {
    renderErrMessage(`Email is empty.`);
    dataIsValid = false;
  } else if (!password) {
    renderErrMessage(`Password is empty`);
    dataIsValid = false;
  } else if (!confirmedPassword) {
    renderErrMessage(`Confirm your password`);
    dataIsValid = false;
  } else if (password.toString() !== confirmedPassword.toString()) {
    renderErrMessage(`Passwords don't match.`);
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
          renderErrMessage(data.error);
        }
        if (data.message) {
          renderSuccessMessage(data.message);
        }
      });
  }
});
