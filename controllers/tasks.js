const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/customErrors");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    status: "success",
    tasks,
  });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    task,
  });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const data = req.body;
  const updatedTask = await Task.findByIdAndUpdate(taskId, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return next(createCustomError(`No task with id : ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    updatedTask,
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
