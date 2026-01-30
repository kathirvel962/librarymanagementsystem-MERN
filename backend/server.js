const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));

// Book routes
app.use("/api/books", require("./routes/bookRoutes"));

// Root route for health check
app.get("/", (req, res) => {
  res.json({ message: "Library Management System API is running" });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require("cors");

app.use(cors({
  origin: "https://library-management-system.vercel.app",
  credentials: true
}));

module.exports = app;
