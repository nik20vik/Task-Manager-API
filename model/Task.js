const mongoose = require("mongoose");

// Setting the validation is important
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must Provide Task Name"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 chars"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Will use this model in controllers
module.exports = mongoose.model("Task", TaskSchema);
