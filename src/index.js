const express = require("express");
require("./db/mongoose");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(auth);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
