const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserController {
  async getAllUser(req, res) {
    const users = await User.find();
    res.status(200).json({ data: users });
  }

  async createUser(req, res) {
    const user = new User(req.body);
    try {
      await user.save();

      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }
  async getOneUser(req, res) {
    const _id = req.params.id;
    try {
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({ data: user });
    } catch (err) {
      res.status(404).json({ err: err.message });
    }
  }
  async updateUser(req, res) {
    const updates = Object.keys(req.body);
    const alowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      alowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates!" });
    }

    const id = req.params.id;
    try {
      const user = await User.findById(id);
      if (!user) throw new Error("User not found");

      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      await user.save();
      res.status(202).json({ data: user });
    } catch (err) {
      res.status(400).json({});
    }
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.status(400).json({ error: "User not found" });
      res.status(202).json({ data: user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new UserController();
