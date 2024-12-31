const { createTask, getTasks, updateTask, deleteTask } = require("../services/taskService");

const create = async (req, res) => {
  try {
    const task = await createTask({ ...req.body, userId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const tasks = await getTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedTask = await updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { create, getAll, update, remove };
