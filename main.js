const addProjectBtn = document.querySelectorAll(".addProjectBtn");
const modelWindow = document.querySelector(".modelWindow");
const rightContent = document.querySelector(".right");
const cancelBtn = document.querySelector(".cancelBtn");
const saveBtn = document.querySelector(".saveBtn");
const title = document.querySelector("#title");
const des = document.querySelector("#des");
const date = document.querySelector("#date");
const listTitle = document.querySelector(".listTitle");
const savedNoteTitle = document.querySelector(".savedNoteTitle");
const savedNoteDate = document.querySelector(".savedNoteDate");
const savedNoteDes = document.querySelector(".savedNoteDes");
const savedNoteContainer = document.querySelector(".savedNoteContainer");
const inputTask = document.querySelector(".inputTask");
const addTaskBtn = document.querySelector(".addTaskBtn");
const taskContainer = document.querySelector(".taskContainer");
const taskBox = document.querySelector(".taskBox");

let storedData = JSON.parse(localStorage.getItem("data")) || [];
console.log(storedData);

storedData.forEach((note) => {
  console.log(note);
  const li = document.createElement("li");
  li.innerHTML = note.Title;
  const btn = document.createElement('button')
  btn.textContent = 'X'
  const div = document.createElement('div')
  div.classList.add('individual-title-box')
  div.appendChild(li)
  div.appendChild(btn)
  div.id = note.id
  listTitle.appendChild(div);

});


listTitle.addEventListener("click", (e) => {
  taskBox.innerHTML = "";

  let titles = e.target.closest(".individual-title-box");
  console.log(titles)
  if (!titles) return;

 const id = +titles.id
 if(e.target.closest('li')) displayNoteDetails(id)
  if(e.target.closest('button')) deleteNote(id)
  
  

   
});


function deleteNote(id){
  
    let sure = confirm("Do you really want to delete this note?");
    
    if(sure){

      storedData = storedData.filter(obj => obj.id !== id )
  
      localStorage.setItem('data',JSON.stringify(storedData))
      
    

    }


}

function deleteTask(){
    
}



addProjectBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modelWindow.classList.remove("hidden");
    rightContent.classList.add("hidden");
    savedNoteContainer.classList.add("hidden")
  });
});


cancelBtn.addEventListener("click", () => {
  modelWindow.classList.add("hidden");
  rightContent.classList.remove("hidden");
});


saveBtn.addEventListener("click", () => {
  let noteData = {
    id: Math.random(),
    Title: title.value,
    Des: des.value,
    Date: date.value,
    tasks: [],
  };

  storedData.push(noteData);
  localStorage.setItem("data", JSON.stringify(storedData));

  const li = document.createElement("li");
  li.innerHTML = noteData.Title;
  listTitle.appendChild(li);

  title.value = "";
  des.value = "";
  date.value = "";

  modelWindow.classList.add("hidden");
  rightContent.classList.remove("hidden");
});


console.log(storedData);


function displayTasks(task, clickedNote) {
  taskBox.classList.remove('hidden')
  const div = document.createElement('div')
  div.classList.add('individual-task-box')
  div.id  =task.id
  const li = document.createElement("li");
  li.innerHTML = task.value;
   li.classList.add('task-list')
   const btn = document.createElement('button')
   btn.textContent = 'Clear'
   div.appendChild(li)
   div.appendChild(btn)
  taskBox.appendChild(div);


  div.addEventListener('click' , (e) => {
    console.log(clickedNote)
     clickedNote.tasks = clickedNote.tasks.filter(t => task.id !== t.id)
    localStorage.setItem('data', JSON.stringify(storedData) )
    
   
  })
}





function displayNoteDetails(id){
  const clickedNote = storedData.find((note) => note.id === id);
  console.log(clickedNote);

  if (clickedNote) {
    clickedNote.tasks.forEach(task => {
        console.log(task)
        displayTasks(task, clickedNote)
    })
  }


  rightContent.classList.add("hidden");
     modelWindow.classList.add('hidden')
  savedNoteContainer.classList.remove("hidden");
  savedNoteTitle.innerHTML = clickedNote.Title;
  savedNoteDes.innerHTML = clickedNote.Des;
  savedNoteDate.innerHTML = clickedNote.Date;

  addTaskBtn.addEventListener("click", (e) => {
    console.log("clicked");
    const task = {
        id: Math.random(),
        value: inputTask.value
    }
    clickedNote.tasks.push(task);
    localStorage.setItem("data", JSON.stringify(storedData));
    displayTasks(task, clickedNote)

   
    //    clickedNote.tasks.push(li.innerHTML)
    console.log(clickedNote);
  })
}