const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: Number,
});

module.exports = mongoose.model("Student", studentSchema);
