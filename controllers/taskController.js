const Task = require('../models/taskModels');


exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getTodos = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};


exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = await Task.findByPk(id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = title ?? task.title;
  task.completed = completed ?? task.completed;

  await task.save();
  res.json(task);
};


exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  await task.destroy();
  res.json({ message: "Task deleted" });
};