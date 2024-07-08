let express = require("express");
let cors = require("cors");
let app = express();
let PORT = 3000;
app.listen(PORT, () => {
  console.log("This server is running");
});
app.use(cors());
let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
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
function readAllTasks(tasks) {
  return tasks;
}
app.get("/tasks", (req, res) => {
  let result = readAllTasks(tasks);
  res.json({ tasks: result });
});
// Endpoint 3. Sort Tasks by Priority
function sortTasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
}
app.get("/tasks/sort-by-priority", (req, res) => {
  let tasksCopy = tasks.slice();
  tasksCopy.sort(sortTasksByPriority);
  res.json({tasks: tasksCopy });
});
// Endpoint 4. Edit Task Priority
function editPriorityById(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editPriorityById(tasks, taskId, priority);
  res.json({ tasks: result });
});
// Endpoint 5. Edit/Update Task Text
function editTextById(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTextById(tasks, taskId, text);
  res.json({ tasks: result });
});
// Endpoint 6. Delete a Task from the Task List
function deleteTasksById(task, taskId) {
  return task.taskId != taskId;
}
app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((task) => deleteTasksById(task, taskId));
  res.json({tasks: result });
});
// Endpoint 7. Filter Tasks by Priority
function filterTasksByPriority(task, priority) {
  return task.priority === priority;
}
app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => filterTasksByPriority(task, priority));
  res.json({ tasks: result });
});