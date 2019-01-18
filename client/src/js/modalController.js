const alertDiv = document.getElementById("alert-div");
const alertModal = document.getElementById("alert-modal");

const closeModalBtn = document.getElementById("close-modal-btn");

closeModalBtn.addEventListener("click", e => {
  e.preventDefault();
  alertModal.style.display = "none";
  alertDiv.innerHTML = "";
});

export const showModalMessage = text => {
  text = text.toString();
  alertDiv.innerHTML = `
  <p>${text}</p>
  `;
  alertModal.style.display = "block";
};
