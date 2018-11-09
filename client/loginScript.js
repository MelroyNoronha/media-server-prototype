const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-btn");
const alertDiv = document.getElementById("alertDiv");

const renderErrorAlert = text => {
  text = text.toString();
  alertDiv.innerHTM = ``;
  alertDiv.innerHTML = `
      <p class="alert-error"><strong>Error:</strong> ${text}</p>
    `;
};

const renderSuccessAlert = text => {
  text = text.toString();
  alertDiv.innerHTM = ``;
  alertDiv.innerHTML = `
      <p class="alert-success"><strong>Success:</strong> ${text}</p>
    `;
};

const storeJwtInLocalStorage = token => {
  localStorage.setItem("media-server-token", token.toString());
};

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
        renderErrorAlert(data.error);
      }
      if (data.message) {
        renderSuccessAlert(data.message);
        storeJwtInLocalStorage(data.token);
      }
    });
});
