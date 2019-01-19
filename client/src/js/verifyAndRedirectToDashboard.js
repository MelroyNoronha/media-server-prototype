import { showLoadingGif, hideLoadingGif } from "./loadingGifController";

const verifyTokenAndRedirectToDashboard = () => {
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
        console.log(error);
      }
      if (data.tokenVerified == true) {
        window.location = "./dashboard.html";
      }
    });
};

export default verifyTokenAndRedirectToDashboard;
