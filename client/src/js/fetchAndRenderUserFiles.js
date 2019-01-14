const fileList = document.getElementById("file-list");

const renderUserFiles = files => {
  files.forEach((file, index) => {
    fileList.innerHTML += 
    `</br> 
      <li id="file-${index}"> 
        <h4> ${file.filename} </h4>
        <p> Uploaded on: ${file.uploadDate}</p>
        <p> Type: ${file.contentType}</p>
      </li> 
    </br>`;
  });
};

export default () => {
  fetch("http://localhost:8083/userFiles", {
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
