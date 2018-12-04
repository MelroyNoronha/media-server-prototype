window.onload = () => {
  if (!localStorage.getItem("media-server-token")) {
    window.location = "./login.html";
  } else {
    fetch("http://localhost:8083/dashboard", {
      method: "post",
      headers: {
        authorization: localStorage.getItem("media-server-token"),
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          window.location = "./login.html";
        }
        if (data.tokenVerified == true) {
          console.log("here is all your data enjoy :)");
          //fetch("http://localhost:8083/userData");
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
  let uploadedFile = fileInput.files[0];
  const formData = new FormData();

  for (var key in uploadedFile) {
    formData.append(key, uploadedFile[key]);
  }
  console.log(uploadedFile);

  fetch("http://localhost:8083/upload", {
    method: "post",
    body: formData
  })
    .then(res => res.json())
    .then(data => console.log(data));
});
