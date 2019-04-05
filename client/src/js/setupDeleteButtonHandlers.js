import { showLoadingGif, hideLoadingGif } from "../js/loadingGifController";
import { showDeleteWarningModal } from "./modalController";

export default () => {
  const deleteBtns = document.querySelectorAll(".delete-btn");
  let clickedFileId;
  let clickedFileName;

  deleteBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      clickedFileId = e.target.parentNode.id;
      clickedFileName = e.target.parentNode.querySelector("h3").innerText;

      showDeleteWarningModal(
        `Are you sure you want to delete ${clickedFileName}?`
      );
    });
  });

  const deleteWarnModal = document.getElementById("delete-warn-modal");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");

  yesBtn.addEventListener("click", e => {
    e.preventDefault();
    deleteWarnModal.style.display = "none";

    showLoadingGif();
    fetch(`${process.env.SERVER_URL}/deleteFile`, {
      method: "post",
      headers: {
        authorization: localStorage.getItem("media-server-token"),
        user: localStorage.getItem("media-server-email"),
        _id: clickedFileId,
        filename: clickedFileName
      }
    })
      .then(res => res.json())
      .then(data => {
        hideLoadingGif();
        console.log(data);
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
        hideLoadingGif();
        showGenericMessageModal("Could not connect to server :(");
      });
  });

  noBtn.addEventListener("click", e => {
    e.preventDefault();
    deleteWarnModal.style.display = "none";
  });
};
