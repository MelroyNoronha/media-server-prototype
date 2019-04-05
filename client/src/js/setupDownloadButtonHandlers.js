import { showLoadingGif, hideLoadingGif } from "../js/loadingGifController";
import saveBlobToFile from "./saveBlobToFile";
import { showGenericMessageModal } from "./modalController";

export default () => {
  const downloadBtns = document.querySelectorAll(".download-btn");

  downloadBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const clickedFileId = e.target.parentNode.id;
      const clickedFileName = e.target.parentNode.querySelector("h3").innerText;

      showLoadingGif();
      fetch(`${process.env.SERVER_URL}/download`, {
        method: "get",
        headers: {
          authorization: localStorage.getItem("media-server-token"),
          _id: clickedFileId
        }
      })
        .then(res => res.blob())
        .then(blob => {
          hideLoadingGif();
          saveBlobToFile(blob, clickedFileName);
        })
        .catch(err => {
          console.error(err);
          hideLoadingGif();
          showGenericMessageModal("Could not connect to server :(");
        });
    });
  });
};
