const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app")

getNote().forEach((note)=>{
   const noteEl = createNoteEl(note.id, note.content)
   appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id, content) {
  const element = document.createElement("textarea")
  element.classList.add("note");
  element.Placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", ()=>{
    const warning = confirm("hey, Did you want to delete this note??");
    if(warning) {
      deleteNote(id, element);
    }
  });

  element.addEventListener("input", () => {
    updateNote(id, element.value);
  });

   return element;
}

function deleteNote(id, element) {
  const notes = getNote().filter((note)=>note.id != id)
  saveNote(notes)
  appEl.removeChild(element)
}

function updateNote(id, content) {
    const notes = getNote();
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);
}


function addNote() {
  const notes = getNote();
 const noteObj = {
    id: Math.floor(Math.random() * 100000 ),
    content: "",
  };
  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);
  
  saveNote(notes);
}

function saveNote(note){
  localStorage.setItem("note-app", JSON.stringify(note))
}

function getNote() {
   return JSON.parse(localStorage.getItem("note-app") || "[]");
}


btnEl.addEventListener("click", addNote);