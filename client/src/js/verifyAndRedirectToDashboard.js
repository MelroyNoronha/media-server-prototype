const verifyTokenAndRedirectToDashboard = () => {
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
        console.log(error);
      }
      if (data.tokenVerified == true) {
        window.location = "./dashboard.html";
      }
    });
}

export default verifyTokenAndRedirectToDashboard;