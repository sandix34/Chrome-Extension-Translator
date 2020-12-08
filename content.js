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
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.translation && res.translation.length > 0) {
          const translation = res.translation;
          console.log("traduction", translation);
          insertHtmlAfterSelection(window.getSelection(), translation);
        }
      });
  }
}

// https://stackoverflow.com/questions/3597116/insert-html-after-a-selection
function insertHtmlAfterSelection(selectionObject, translation) {
  let range;
  let expandedSelRange;
  let node;
  if (selectionObject.getRangeAt && selectionObject.rangeCount) {
    range = selectionObject.getRangeAt(0);
    expandedSelRange = range.cloneRange();
    range.collapse(false);

    // Range.createContextualFragment() would be useful here but is
    // non-standard and not supported in all browsers (IE9, for one)
    const el = document.createElement("div");
    el.innerHTML = ` [FR: ${translation} ] `;
    let frag = document.createDocumentFragment();
    let lastNode;
    while ((node = el.firstChild)) {
      lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);
    selectionObject.empty();
  }
}

document.addEventListener("mouseup", getUserSelection);
