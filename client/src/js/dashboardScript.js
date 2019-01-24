import { showLoadingGif, hideLoadingGif } from "./loadingGifController";
import { showModalMessage } from "./modalController";
import fetchAndRenderUserFiles from "../js/fetchAndRenderUserFiles";
import saveBlobToFile from "./saveBlobToFile";

window.onload = () => {
  if (!localStorage.getItem("media-server-token")) {
    window.location = "./login.html";
  } else {
    showLoadingGif();
    fetch("http://localhost:8081/dashboard", {
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
          fetchAndRenderUserFiles();
        }
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
  fetch("http://localhost:8081/upload", {
    method: "post",
    headers: {
      authorization: localStorage.getItem("media-sever-token")
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      hideLoadingGif();
      window.location.reload();
      showModalMessage(data.message);
    });
});

const fileListDiv = document.getElementById("file-list-div");

fileListDiv.addEventListener("click", e => {
  e.preventDefault();
  let clickedFileId = e.target.parentNode.id;
  let clickedFileName = e.target.parentNode.querySelector("h3").innerText;

  fetch("http://localhost:8081/download", {
    method: "get",
    headers: {
      authorization: localStorage.getItem("media-server-token"),
      _id: clickedFileId
    }
  })
    .then(res => res.blob())
    .then(blob => {
      saveBlobToFile(blob, clickedFileName);
    });
});
