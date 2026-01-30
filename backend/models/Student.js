const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: { type: String, unique: true },
  department: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "student" },
  borrowedBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      borrowedDate: {
        type: Date,
        default: Date.now,
      },
      dueDate: {
        type: Date,
        default: function() {
          const date = new Date();
          date.setDate(date.getDate() + 14); // 14 days borrowing period
          return date;
        }
      },
    },
  ],
});

module.exports = mongoose.model("Student", StudentSchema);
