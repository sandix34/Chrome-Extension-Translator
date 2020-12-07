function getUserSelection() {
  if (window.getSelection) {
    const selection = window.getSelection().toString();
    console.log("selection", selection);
  }
}

document.addEventListener("mouseup", getUserSelection);
