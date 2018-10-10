const form = document.querySelector("#form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const submitBtn = document.querySelector("#submit-btn");
const alertDiv = document.querySelector("#alertDiv");

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

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const userCredentials = {
    email: emailInput.value.toString(),
    password: passwordInput.value.toString()
  };
  console.log(userCredentials);
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
      }
    });
});
