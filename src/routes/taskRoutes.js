const express = require("express");
const router = express.Router();
const TaskController = require("../controller/taskController");
router
  .route("/")
  .get(TaskController.getAllTask)
  .post(TaskController.getAllTask);

router
  .route("/:id")
  .get(TaskController.findOneTask)
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);

module.exports = router;
