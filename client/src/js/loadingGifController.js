const loadingGifDiv = document.getElementById("loading-gif-div");

export const showLoadingGif = () => {
  loadingGifDiv.style.display = "block";
};

export const hideLoadingGif = () => {
  loadingGifDiv.style.display = "none";
};
