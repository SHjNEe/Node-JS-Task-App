const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const UserController = require("../controller/userController");
router
  .route("/")
  .post(UserController.createUser)
  .get(UserController.getAllUser);

router
  .route("/:id")
  .get(UserController.getOneUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
