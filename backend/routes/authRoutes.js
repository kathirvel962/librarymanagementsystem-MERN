const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const router = express.Router();

/* ADMIN REGISTRATION */
router.post("/admin/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = new Admin({
      username,
      password: hashedPassword
    });

    await admin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* STUDENT REGISTRATION */
router.post("/student/register", async (req, res) => {
  try {
    const { name, rollNo, department, email, password } = req.body;
    
    const existingStudent = await Student.findOne({ $or: [{ email }, { rollNo }] });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists with this email or roll number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const student = new Student({
      name,
      rollNo,
      department,
      email,
      password: hashedPassword
    });

    await student.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* STUDENT LOGIN */
router.post("/student/login", async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) return res.status(400).json({ message: "Student not found" });

  const match = await bcrypt.compare(password, student.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: student._id, role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: "student" });
});

/* ADMIN LOGIN */
router.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, role: "admin" });
});

module.exports = router;
