const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shjneevn:4nhy3u3m@taskapp.uqcyddn.mongodb.net/TaskApp?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
