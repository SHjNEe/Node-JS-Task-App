const Task = require("../models/task");

class TaskController {
  async getAllTask(req, res) {
    const tasks = await Task.find();
    return res.status(200).json({ data: tasks });
  }

  async createTask(req, res) {
    const task = new Task(req.body);
    try {
      await task.save();
      res.status(201).json({ data: task });
    } catch (err) {
      res.status(400).send(e);
    }
  }

  async findOneTask(req, res) {
    const _id = req.params.id;
    try {
      const task = await Task.findById(_id);
      if (!task) {
        throw new Error("Task not found");
      }
      res.status(200).json({ data: task });
    } catch (err) {
      res.status(404).json({ err: err.message });
    }
  }
  async updateTask(req, res) {
    const updates = Object.keys(req.body);
    const alowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      alowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).json({ err: "Invalid updates" });
    }
    const id = req.params.id;
    try {
      const task = await Task.findById(id);
      if (!task) throw new Error("Task not found");
      updates.forEach((update) => (task[update] = req.body[update]));
      await task.save();
      res.status(202).json({ data: task });
    } catch (err) {
      res.status(400).json({});
    }
  }
  async deleteTask(req, res) {
    const id = req.params.id;
    try {
      const task = await Task.findByIdAndDelete(id);
      if (!task) return res.status(400).json({ error: "Task not found" });
      res.status(202).json({ data: task });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new TaskController();
