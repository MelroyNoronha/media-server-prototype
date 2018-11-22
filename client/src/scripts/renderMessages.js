const alertDiv = document.getElementById("alert-div");

export const renderErrorAlert = text => {
  text = text.toString();
  alertDiv.innerHTM = ``;
  alertDiv.innerHTML = `
      <p class="alert-error"><strong>Error:</strong> ${text}</p>
    `;
};

export const renderSuccessAlert = text => {
  text = text.toString();
  alertDiv.innerHTM = ``;
  alertDiv.innerHTML = `
      <p class="alert-success"><strong>Success:</strong> ${text}</p>
    `;
};
