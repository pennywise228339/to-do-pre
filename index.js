const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const inputElement = document.querySelector(".to-do__input");
const formElement = document.querySelector(".to-do__form");

formElement.addEventListener("submit", function(event) {
  event.preventDefault();
  const newTask = createItem(inputElement.value);
  listElement.prepend(newTask);
  saveTasks(getTasksFromDOM());
  formElement.reset();
});

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);

  const textElement = clone.querySelector(".to-do__item-text");
  textElement.textContent = item;

  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  deleteButton.addEventListener("click", function() {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });

  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  duplicateButton.addEventListener("click", function() {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    saveTasks(getTasksFromDOM());
  });

  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  editButton.addEventListener("click", function() {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });
  
  textElement.addEventListener("blur", function() {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });

  return clone;
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("allTasks"));
  if (savedTasks && savedTasks.length != 0) return savedTasks;
  return items;
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach(el => tasks.push(el.textContent));
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("allTasks", JSON.stringify(tasks));
}


const tasksToLoad = loadTasks();
tasksToLoad.forEach(item => { 
  listElement.append(createItem(item)); 
});