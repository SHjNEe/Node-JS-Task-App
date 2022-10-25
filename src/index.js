const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
});

// app.get("/users/:id", (req, res) => {
//   const _id = req.params.id;
//   User.findById(_id)
//     .then((result) => {
//       if (!result) {
//         throw new Error("User not found");
//       }

//       res.status(200).json({ data: result });
//     })
//     .catch((err) => {
//       res.status(400).json({ err: err.message });
//     });
// });

app.get("/users/:id", async (req, res) => {
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
});

app.post("/task", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get("/task", async (req, res) => {
  const tasks = await Task.find();
  return res.status(200).json({ data: tasks });
});

app.get("/task/:id", async (req, res) => {
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
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
