import { showLoadingGif, hideLoadingGif } from "../js/loadingGifController";
import saveBlobToFile from "./saveBlobToFile";

export default () => {
  const downloadBtns = document.querySelectorAll(".download-btn");

  downloadBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const clickedFileId = e.target.parentNode.id;
      const clickedFileName = e.target.parentNode.querySelector("h3").innerText;

      showLoadingGif();
      fetch("http://localhost:8081/download", {
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
        });
    });
  });
};
