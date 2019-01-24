export default (blob, fileName = "file-name") => {
  let url = window.URL.createObjectURL(blob);
  let downloadLink = document.createElement("a");
  downloadLink.style = "display: none";
  document.body.appendChild(downloadLink);
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
  window.URL.revokeObjectURL(url);
};
