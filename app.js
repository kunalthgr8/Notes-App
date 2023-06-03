console.log("Hello World");

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTitle = document.getElementById("addTitle");
  let addText = document.getElementById("addText");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (addTitle.value.trim() == "") {
    addTitle.value = "Note";
  }
  if (addText.value.trim() == "") {
    alert("Field Required");
    addTitle.value = "";
    addText.value = "";
    return;
  }
  const textTitle = {
    title: addTitle.value.toUpperCase(),
    text: addText.value,
  };
  notesObj.push(textTitle);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  addTitle.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="note-container">
        <h2>${element.title}</h2>
        <p>${element.text}</p>
        <div class="delete-edit">
            <button id="${index}" onclick="deleteNote(this.id)" class="delete-button">Delete</button>
            <button id="${index}" onclick="editNote(this.id)"class="edit-button">Edit</button>
        </div>
    </div>
    `;
  });
  let notesElm = document.getElementById("notes");
  notesElm.innerHTML = html;
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let notesObj2 = [];
  for (let i = 0; i < notesObj.length; i++) {
    if (i != index) {
      notesObj2.push(notesObj[i]);
    }
  }
  localStorage.setItem("notes", JSON.stringify(notesObj2));
  showNotes();
}
function editNote(index) {
  let notes = localStorage.getItem("notes");
  let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let note = notesObj[index];
  let editTitle = prompt("Enter new title:", note.title);
  let editText = prompt("Enter new text:", note.text);
  if (editTitle !== null && editText !== null) {
    note.title = editTitle;
    note.text = editText;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

let search = document.getElementById("search-input");
search.addEventListener("input", function () {
  let noteCards = document.getElementsByClassName("note-container");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    let cardTitle = element
      .getElementsByTagName("h2")[0]
      .innerText.toLowerCase();
    if (
      cardTxt.includes(search.value.toLowerCase()) ||
      cardTitle.includes(search.value.toLowerCase())
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

showNotes();
