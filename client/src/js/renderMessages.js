const alertDiv = document.getElementById("alert-div");

export const renderErrorMessage = text => {
  text = text.toString();
  alertDiv.innerHTML = ``;
  alertDiv.innerHTML = `
      <p class="alert-error"><strong>Error:</strong> ${text}</p>
    `;
};

export const renderSuccessMessage = text => {
  text = text.toString();
  alertDiv.innerHTML = ``;
  alertDiv.innerHTML = `
      <p class="alert-success"><strong>Success:</strong> ${text}</p>
    `;
};
