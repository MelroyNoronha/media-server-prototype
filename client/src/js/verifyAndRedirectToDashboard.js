import { showLoadingGif, hideLoadingGif } from "./loadingGifController";

const verifyTokenAndRedirectToDashboard = () => {
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
        console.log(error);
      }
      if (data.tokenVerified == true) {
        window.location = "./dashboard.html";
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

export default verifyTokenAndRedirectToDashboard;
