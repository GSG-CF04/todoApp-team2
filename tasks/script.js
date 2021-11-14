// **** open and close modal box ****

let close = document.getElementsByClassName("close-btn")[0];
let modal = document.getElementById("modal");
let overlay = document.getElementById("overlay");

// open

let open = document.getElementsByClassName("add-btn")[0];

open.addEventListener("click", openFun);

function openFun() {
  modal.style.display = "block";
  overlay.style.opacity = 1;
}

// close

close.addEventListener("click", closeFun);

function closeFun() {
  modal.style.display = "none";
  overlay.style.opacity = 0;
}

// **** add new task to localStorage & HTML tree ****

let submit = document.getElementById("button").addEventListener("click", add);

function add() {
  // get data from input and select box
  let new_task = document.getElementById("task").value;
  let new_task_pri = document.getElementById("pri").value;

  // check if theres nothing saved in the storage
  if (localStorage.getItem("task") == null) {
    localStorage.setItem("task", "[]");
  }

  // push new data to the array
  let old_tasks = JSON.parse(localStorage.getItem("task"));
  old_tasks.push([new_task, new_task_pri]);

  // save it to the local storage
  localStorage.setItem("task", JSON.stringify(old_tasks));

  // add to html tree

  let allTasks = JSON.parse(localStorage.getItem("task"));

  let i = allTasks.length - 1;

  let tilesSection = document.querySelector("#all-screen");

  let tile = document.createElement("section");
  tile.setAttribute("class", "tile");
  tile.setAttribute(`id`, `tile-${i}`);

  let checkImg = document.createElement("img");
  checkImg.setAttribute("class", "check");
  checkImg.setAttribute("src", "../assets/imgs/check.png");
  checkImg.setAttribute(
    `onclick`,
    `check('${allTasks[i][0]}' , 'task' , 'tile-${i}') `
  );

  let editImg = document.createElement("img");
  editImg.setAttribute("class", "edit");
  editImg.setAttribute("src", "../assets/imgs/edit.png");
  editImg.setAttribute(
    `onclick`,
    `edit('${allTasks[i][0]}' , 'task' , 'tile-${i}') `
  );

  let deleteImg = document.createElement("img");
  deleteImg.setAttribute("class", "delete");
  deleteImg.setAttribute("src", "../assets/imgs/delete.png");
  deleteImg.setAttribute(
    `onclick`,
    `del('${allTasks[i][0]}' , 'task' , 'tile-${i}') `
  );

  let p = document.createElement("p");
  p.setAttribute("class", "task-text");

  tilesSection.appendChild(tile);

  switch (allTasks[i][1]) {
    case "urgent":
      tile.style.borderLeft = "#f7241d solid 3px";
      break;
    case "important":
      tile.style.borderLeft = "#ea8c1c solid 3px";
      break;
    case "lessImportant":
      tile.style.borderLeft = "#0e9eeb solid 3px";
      break;
  }

  tile.appendChild(checkImg);
  tile.appendChild(p);
  p.textContent = `${allTasks[i][0]}`;
  tile.appendChild(editImg);
  tile.appendChild(deleteImg);


  
  closeFun();
}
