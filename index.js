let express = require("express");
let cors = require("cors");
let app = express();
let PORT = 3000;
app.listen(PORT, () => {
  console.log("This server is running");
});
app.use(cors());
let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];
// Endpoint 1. Add a Task to the Task List
function addNewTask(tasks, taskId, text, priority) {
  let newTask = {};
  newTask.taskId = taskId;
  newTask.text = text;
  newTask.priority = priority;
  tasks.push(newTask);
  return tasks;
}
app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let result = addNewTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});
// Endpoint 2. Read All Tasks in the Task List
let updatedTasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
  { taskId: 4, text: "Review code", priority: 1 },
];
function readTasks(updatedTasks) {
  return updatedTasks;
}
app.get("/tasks", (req, res) => {
  let tasks = readTasks(updatedTasks);
  res.json({ tasks: tasks });
});
//Endpoint 3. Sort Tasks by Priority
function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
}
app.get("/tasks/sort-by-priority", (req, res) => {
  let tasksCopy = updatedTasks.slice();
  tasksCopy.sort(sortTasksByPriority);
  res.json({ tasks: tasksCopy });
});
// Endpoint 4. Edit Task Priority
function editPriorityById(updatedTasks, taskId, priority) {
  for (let i = 0; i < updatedTasks.length; i++) {
    if (updatedTasks[i].taskId === taskId) {
      updatedTasks[i].priority = priority;
    }
  }
  return updatedTasks;
}
app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editPriorityById(updatedTasks, taskId, priority);
  res.json({ tasks: result });
});
// Endpoint 5. Edit/Update Task Text
let newTasksArray = [
  { taskId: 1, text: "Fix bug #101", priority: 1 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
  { taskId: 4, text: "Review code", priority: 1 },
];
function editTextById(newTasksArray, taskId, text) {
  for (let i = 0; i < newTasksArray.length; i++) {
    if (newTasksArray[i].taskId === taskId) {
      newTasksArray[i].text = text;
    }
  }
  return newTasksArray;
}
app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTextById(newTasksArray, taskId, text);
  res.json({ tasks: result });
});
//Endpoint 6. Delete a Task from the Task List
function deleteTaskById(task, taskId) {
  return task.taskId != taskId;
}
app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = newTasksArray.filter((task) => deleteTaskById(task, taskId));
  res.json({ tasks: result });
});
// Endpoint 7. Filter Tasks by Priority
let tasksAfterDeletion = [
  { taskId: 1, text: "Fix bug #101", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
  { taskId: 4, text: "Review code", priority: 1 },
];
function filterByPriority(task, priority) {
  return task.priority === priority;
}
app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasksAfterDeletion.filter((task) => filterByPriority(task, priority));
  res.json({ tasks: result });
});