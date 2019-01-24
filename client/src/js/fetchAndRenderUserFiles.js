const fileList = document.getElementById("file-list");

const renderUserFiles = files => {
  files.forEach((file, index) => {
    fileList.innerHTML += `
      <li id="${file._id}"> 
        <h3 id="${file.filename}"> ${file.filename} </h3>
        <p> <strong>Uploaded on:</strong> ${file.uploadDate}</p>
        <p> <strong>Type:</strong> ${file.contentType}</p>
        <button id="btn-${index}">Download</button>
      </li> 
    `;
  });
};

export default () => {
  fetch("http://localhost:8081/userFiles", {
    method: "get",
    headers: {
      authorization: localStorage.getItem("media-server-token"),
      user: localStorage.getItem("media-server-email")
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.files) renderUserFiles(data.files);
    });
};
