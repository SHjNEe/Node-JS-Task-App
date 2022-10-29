const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const authController = require("../controller/authController");
router.route("/login").post(authController.login);

module.exports = router;
