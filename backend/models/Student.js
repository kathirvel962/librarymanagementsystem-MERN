const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: String, unique: true },
  department: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" }
});

module.exports = mongoose.model("Student", StudentSchema);
