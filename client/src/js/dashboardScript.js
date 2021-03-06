import { showLoadingGif, hideLoadingGif } from "./loadingGifController";
import { showGenericMessageModal } from "./modalController";
import fetchAndRenderUserFileList from "./fetchAndRenderUserFileList";

window.onload = () => {
  if (!localStorage.getItem("media-server-token")) {
    window.location = "./login.html";
  } else {
    showLoadingGif();
    fetch(`${process.env.SERVER_URL}/dashboard`, {
      method: "post",
      headers: {
        authorization: localStorage.getItem("media-server-token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        hideLoadingGif();
        if (data.error) {
          window.location = "./login.html";
        }
        if (data.tokenVerified == true) {
          fetchAndRenderUserFileList();
        }
      })
      .catch(err => {
        console.log(err);
        hideLoadingGif();
        showGenericMessageModal(
          "Could not connect to server :("
        );
      });
  }
};

const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("file-input");

uploadBtn.addEventListener("click", e => {
  e.preventDefault();
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  let formData = new FormData();
  formData.append("uploaded-file", fileInput.files[0]);
  formData.append("email", localStorage.getItem("media-server-email"));

  showLoadingGif();
  fetch(`${process.env.SERVER_URL}/upload`, {
    method: "post",
    headers: {
      authorization: localStorage.getItem("media-server-token")
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      hideLoadingGif();
      window.location.reload();
      showGenericMessageModal(data.message);
    })
    .catch(err => {
      console.log(err);
      hideLoadingGif();
      showGenericMessageModal(
        "Could not connect to server :("
      );
    });
});
