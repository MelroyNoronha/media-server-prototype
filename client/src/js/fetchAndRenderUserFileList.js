import setupDownloadButtonHandlers from "./setupDownloadButtonHandlers";
import setupDeleteButtonHandlers from "./setupDeleteButtonHandlers";

const fileList = document.getElementById("file-list");

const renderUserFileList = files => {
  files.forEach((file, index) => {
    let fileSize = Number((file.length/1000000).toFixed(2))

    fileList.innerHTML += `
      <li id="${file._id}"> 
        <h3 id="${file.filename}"> ${file.filename} </h3>
        <p> <strong>Uploaded on:</strong> ${file.uploadDate}</p>
        <p> <strong>Type:</strong> ${file.contentType}</p>
        <p> <strong>Size:</strong> ${fileSize} MB</p>
        <button id="download-btn-${index}" class="download-btn">
          Download
        </button>
        <button id="delete-btn-${index}" class="delete-btn">
          Delete
        </button>
      </li> 
    `;
  });
};

export default () => {
  fetch(`${process.env.SERVER_URL}/userFiles`, {
    method: "get",
    headers: {
      authorization: localStorage.getItem("media-server-token"),
      user: localStorage.getItem("media-server-email")
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.files) {
        renderUserFileList(data.files);
        setupDownloadButtonHandlers();
        setupDeleteButtonHandlers();
      }
    })
    .catch(err => {
      console.log(err);
      hideLoadingGif();
      showGenericMessageModal(
        "Could not connect to server :("
      );
    });
};
