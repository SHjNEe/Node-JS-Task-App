const User = require("../models/user");

class authController {
  async login(req, res, next) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();

      res.status(200).json({ user, token });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}

module.exports = new authController();
