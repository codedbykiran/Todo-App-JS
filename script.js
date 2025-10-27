const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = { text, done: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");

    span.addEventListener("click", () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
