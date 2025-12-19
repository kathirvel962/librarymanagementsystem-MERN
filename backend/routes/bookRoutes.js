const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const router = express.Router();

/* GET ALL BOOKS (Public - anyone can view) */
router.get("/", async (req, res) => {
  try {
    const { category, search, status } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    // Filter by status
    if (status) {
      query.status = status;
    } else {
      query.status = "Active"; // Default: only show active books
    }

    // Search by title, author, or ISBN
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
      ];
    }

    const books = await Book.find(query).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET SINGLE BOOK BY ID (Public) */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ADD NEW BOOK (Admin only) */
router.post("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const {
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      description,
      coverImage,
    } = req.body;

    // Check if book with same ISBN already exists
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }

    const book = new Book({
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      availableCopies: totalCopies, // Initially all copies are available
      description,
      coverImage,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE BOOK (Admin only) */
router.put("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const {
      title,
      author,
      isbn,
      category,
      publisher,
      publishedYear,
      totalCopies,
      description,
      coverImage,
      status,
    } = req.body;

    // If ISBN is being changed, check if new ISBN already exists
    if (isbn && isbn !== book.isbn) {
      const existingBook = await Book.findOne({ isbn });
      if (existingBook) {
        return res.status(400).json({ message: "Book with this ISBN already exists" });
      }
    }

    // Update fields
    if (title) book.title = title;
    if (author) book.author = author;
    if (isbn) book.isbn = isbn;
    if (category) book.category = category;
    if (publisher) book.publisher = publisher;
    if (publishedYear) book.publishedYear = publishedYear;
    if (description) book.description = description;
    if (coverImage) book.coverImage = coverImage;
    if (status) book.status = status;

    // Handle totalCopies update
    if (totalCopies !== undefined) {
      const borrowedCopies = book.totalCopies - book.availableCopies;
      book.totalCopies = totalCopies;
      book.availableCopies = totalCopies - borrowedCopies;

      // Ensure available copies doesn't go negative
      if (book.availableCopies < 0) {
        return res.status(400).json({
          message: `Cannot reduce total copies below ${borrowedCopies} (currently borrowed)`,
        });
      }
    }

    await book.save();
    res.json({ message: "Book updated successfully", book });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE BOOK (Admin only) */
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Check if any copies are currently borrowed
    if (book.availableCopies < book.totalCopies) {
      return res.status(400).json({
        message: "Cannot delete book. Some copies are currently borrowed.",
      });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET BOOK STATISTICS (Admin only) */
router.get("/stats/overview", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const totalBooks = await Book.countDocuments({ status: "Active" });
    const totalCopies = await Book.aggregate([
      { $match: { status: "Active" } },
      { $group: { _id: null, total: { $sum: "$totalCopies" } } },
    ]);
    const availableCopies = await Book.aggregate([
      { $match: { status: "Active" } },
      { $group: { _id: null, total: { $sum: "$availableCopies" } } },
    ]);

    const categoryStats = await Book.aggregate([
      { $match: { status: "Active" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({
      totalBooks,
      totalCopies: totalCopies[0]?.total || 0,
      availableCopies: availableCopies[0]?.total || 0,
      borrowedCopies: (totalCopies[0]?.total || 0) - (availableCopies[0]?.total || 0),
      categoryStats,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
