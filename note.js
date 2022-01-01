let addnewnote = document.getElementById("addnewnote");
let addtitle = document.getElementById("title");
let addnote = document.getElementById("note");
let submitbtn = document.getElementById("submit");
const cardContainer = document.getElementById("card-container");
const noteApp = document.getElementById("noteapp");
const body = document.getElementById("body");
let searchBar = document.getElementById("searchBar");
// for easy search
addnewnote.addEventListener("click", showForm);
function showForm() {
    noteApp.classList.toggle("show-form");
    body.classList.toggle("green");
    addtitle.value = "";
    addnote.value = "";
}
let storeElement = [];
let storeData = [];
const note = localStorage.getItem("notes");
if(note == null){
    console.log("No content");
}else{
    storeData = JSON.parse(note);
    storeData.forEach(noteObj => {
        let title = noteObj.title;
        let note = noteObj.note;
        createElement(title, note);
    });
}
submitbtn.addEventListener("click", addContents);
searchBar.addEventListener("keyup", searchContents);
function addContents() {
    if (addtitle.value === "" || addnote.value === "") {
        alert("Both fields need content");
    } else {
        let titled = addtitle.value;
        let noted = addnote.value;
        if (addtitle.value.length >= 410) {
            alert(`you have entered ${addtitle.value.length} words, the limit is 408 words`);
        } else {
            createElement(titled, noted);
            let noteObj = {
                title: titled,
                note: noted
            }
            storeData.unshift(noteObj);
            localStorage.setItem("notes", JSON.stringify(storeData));
            noteApp.classList.remove("show-form");
            addtitle.value = "";
            addnote.value = "";
            location.reload();
        }
    }
}
function searchContents(e) {
    let searchedTitle = e.target.value;
    let searchedCase = searchedTitle.toLowerCase();
    storeElement.forEach(newElement => {
        let title = newElement.firstElementChild.textContent;
        console.log(title);
        if (title.toLowerCase().indexOf(searchedCase) != -1) {
            newElement.style.display = "flex";
        } else {
            newElement.style.display = "none";
        }
    });
}
function createElement(myTitle, myNote) {
    let newElement = document.createElement("div");
    let newTitle = document.createElement("h2");
    let newNote = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    newElement.classList.add("newDiv");
    newTitle.classList.add("newTitle");
    newNote.classList.add("newNote");
    newTitle.innerText = myTitle;
    newNote.innerText = myNote;
    deleteBtn.classList.add("delete");
    editBtn.classList.add("edit");
    function deleteElement(){
        let deleteChild = deleteBtn.parentElement.firstChild.innerHTML;
        storeData = storeData.filter((noteObj) => noteObj.title !== deleteChild);
        localStorage.removeItem("notes");
        localStorage.setItem("notes", JSON.stringify(storeData));
    }
    //delete btn
    deleteBtn.addEventListener("click", ()=>{
        deleteElement();
        location.reload();
    });
    // edit button
    editBtn.addEventListener("click", () => {
        showForm();
        deleteElement();
        addtitle.value = editBtn.parentElement.firstChild.innerHTML;
        addnote.value = editBtn.parentElement.children[1].innerHTML;
    });
    newElement.append(newTitle, newNote, deleteBtn, editBtn);
    storeElement.unshift(newElement);
    cardContainer.appendChild(newElement);
}