import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [borrowedLoading, setBorrowedLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState("browse"); // 'browse' or 'myBooks'

  const categories = [
    "All",
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Mathematics",
    "Engineering",
    "Literature",
    "Other",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      alert("Access denied. Students only.");
      navigate("/login?role=student");
      return;
    }

    fetchBooks();
    fetchBorrowedBooks();
  }, [navigate, searchTerm, categoryFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (categoryFilter !== "All") params.append("category", categoryFilter);

      const response = await axios.get(`${API_URL}/api/books?${params}`);
      setBooks(response.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      setBorrowedLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/books/student/borrowed`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBorrowedBooks(response.data);
    } catch (err) {
      console.error("Error fetching borrowed books:", err);
    } finally {
      setBorrowedLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const isBookAlreadyBorrowed = (bookId) => {
    return borrowedBooks.some((book) => book._id === bookId);
  };

  const handleReturnBook = async (bookId) => {
    if (!confirm("Are you sure you want to return this book?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/books/${bookId}/return`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book returned successfully!");
      fetchBooks();
      fetchBorrowedBooks();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to return book");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleBorrowBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/books/${bookId}/borrow`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book borrowed successfully!");
      fetchBooks();
      fetchBorrowedBooks();
      setShowDetailsModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to borrow book");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Library Management</h1>
                <p className="text-sm text-gray-600">Student Portal</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to the Library</h2>
          <p className="text-gray-600">Browse and borrow books from our collection</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-3 font-medium transition duration-200 ${
                activeTab === "browse"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Browse Books
            </button>
            <button
              onClick={() => setActiveTab("myBooks")}
              className={`px-6 py-3 font-medium transition duration-200 flex items-center gap-2 ${
                activeTab === "myBooks"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              My Books
              {borrowedBooks.length > 0 && (
                <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                  {borrowedBooks.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Browse Books Tab */}
        {activeTab === "browse" && (
          <>
            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Bar */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Search Books</label>
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Filter by Category</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Available Books</h3>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                  <p className="mt-2 text-gray-600">Loading books...</p>
                </div>
              ) : books.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>No books found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <div
                      key={book._id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
                    >
                      {/* Book Cover */}
                      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <svg className="w-16 h-16 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-1 truncate" title={book.title}>
                          {book.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2 truncate" title={book.author}>
                          by {book.author}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                            {book.category}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            book.availableCopies > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {book.availableCopies > 0 
                              ? `${book.availableCopies} Available` 
                              : 'Not Available'}
                          </span>
                        </div>
                        <button
                          onClick={() => handleViewDetails(book)}
                          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* My Books Tab */}
        {activeTab === "myBooks" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">My Borrowed Books</h3>
            
            {borrowedLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Loading borrowed books...</p>
              </div>
            ) : borrowedBooks.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-lg font-medium">No borrowed books</p>
                <p className="text-sm mt-2">You haven't borrowed any books yet. Browse our collection to get started!</p>
                <button
                  onClick={() => setActiveTab("browse")}
                  className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Browse Books
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {borrowedBooks.map((book) => {
                  const daysRemaining = getDaysRemaining(book.dueDate);
                  const isOverdue = daysRemaining < 0;
                  const isDueSoon = daysRemaining <= 3 && daysRemaining >= 0;

                  return (
                    <div
                      key={book._id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
                    >
                      {/* Book Cover */}
                      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                        {book.coverImage ? (
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <svg className="w-16 h-16 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                          </svg>
                        )}
                        
                        {/* Status Badge */}
                        {isOverdue && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Overdue
                          </div>
                        )}
                        {isDueSoon && (
                          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Due Soon
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-1 truncate" title={book.title}>
                          {book.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 truncate" title={book.author}>
                          by {book.author}
                        </p>

                        {/* Borrowing Details */}
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Borrowed:</span>
                            <span className="font-medium text-gray-800">{formatDate(book.borrowedDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Due Date:</span>
                            <span className={`font-medium ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-800'}`}>
                              {formatDate(book.dueDate)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Days Left:</span>
                            <span className={`font-medium ${isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-green-600'}`}>
                              {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days`}
                            </span>
                          </div>
                        </div>

                        {/* Return Button */}
                        <button
                          onClick={() => handleReturnBook(book._id)}
                          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm font-medium"
                        >
                          Return Book
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Book Details Modal */}
      {showDetailsModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Book Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Book Cover */}
              <div className="mb-4">
                <div className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  {selectedBook.coverImage ? (
                    <img
                      src={selectedBook.coverImage}
                      alt={selectedBook.title}
                      className="h-full w-auto object-contain rounded-lg"
                    />
                  ) : (
                    <svg className="w-24 h-24 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Book Information */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedBook.title}</h4>
                  <p className="text-gray-600">by {selectedBook.author}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ISBN</p>
                    <p className="font-medium text-gray-800">{selectedBook.isbn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium text-gray-800">{selectedBook.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Publisher</p>
                    <p className="font-medium text-gray-800">{selectedBook.publisher || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Published Year</p>
                    <p className="font-medium text-gray-800">{selectedBook.publishedYear || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Copies</p>
                    <p className="font-medium text-gray-800">{selectedBook.totalCopies}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Copies</p>
                    <p className={`font-medium ${selectedBook.availableCopies > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedBook.availableCopies}
                    </p>
                  </div>
                </div>

                {selectedBook.description && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-800">{selectedBook.description}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                {isBookAlreadyBorrowed(selectedBook._id) && (
                  <div className="flex-1 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg text-center">
                    <p className="font-medium">✓ Already Borrowed</p>
                    <p className="text-xs mt-1">Check "My Books" section</p>
                  </div>
                )}
                {!isBookAlreadyBorrowed(selectedBook._id) && (
                  <button
                    onClick={() => handleBorrowBook(selectedBook._id)}
                    disabled={selectedBook.availableCopies === 0}
                    className={`flex-1 py-3 rounded-lg font-medium transition duration-200 ${
                      selectedBook.availableCopies > 0
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedBook.availableCopies > 0 ? 'Borrow Book' : 'Not Available'}
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
