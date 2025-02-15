const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: String,
  status: { type: String, default: "To-Do" }, // Can be "To-Do", "In Progress", "Completed"
});

module.exports = mongoose.model("Task", TaskSchema);
