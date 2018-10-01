const form = document.querySelector("#form");
const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  const userCredentials = {
    "email": emailInput.value.toString(),
    "password": passwordInput.value.toString()
  }
  console.log(userCredentials)
  fetch("http://localhost:8083/auth", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userCredentials)
  })
    .then(res => res.json())
    .then(data => console.log(data));
});
