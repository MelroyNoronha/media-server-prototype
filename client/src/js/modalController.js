const genericModal = document.getElementById("generic-modal");
const alertDiv = document.getElementById("alert-div");
const closeModalBtn = document.getElementById("close-modal-btn");

closeModalBtn.addEventListener("click", e => {
  e.preventDefault();
  genericModal.style.display = "none";
  alertDiv.innerHTML = "";
});

export const showGenericMessageModal = text => {
  text = text.toString();
  alertDiv.innerHTML = `
  <p>${text}</p>
  `;
  genericModal.style.display = "block";
};

const deleteWarnModal = document.getElementById("delete-warn-modal");
const deleteAlertDiv = document.getElementById("delete-alert-div");

export const showDeleteWarningModal = text => {
  text = text.toString();
  deleteAlertDiv.innerHTML = `<p>${text}</p>`;
  deleteWarnModal.style.display = "block";
};
