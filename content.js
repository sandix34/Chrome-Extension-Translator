function getUserSelection() {
  if (window.getSelection) {
    const selection = window.getSelection().toString();

    const payload = {
      text: selection.trim(),
      src: "en",
      dest: "fr",
      email: "frengly account email, enteredduring registration",
      password: "frengly account",
    };

    // https://frengly.com/translate
    fetch("https://frengly.com/frengly/data/translateREST", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(data => data.json())
    .then((res) => {
      console.log(res);
    });
  }
}

document.addEventListener("mouseup", getUserSelection);
