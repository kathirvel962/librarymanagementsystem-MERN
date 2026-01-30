# 📚 Library Management System - MERN Stack

A full-stack Library Management System built with MongoDB, Express.js, React, and Node.js. This application provides complete library management features for both students and administrators.

## ✨ Features

### 👤 Student Features
- **Authentication**
  - Student Login & Registration
  - Secure JWT-based authentication
  - Profile management with Roll No, Department, Email
  
- **Book Management**
  - Browse available books with search and filter
  - View detailed book information
  - Borrow books (14-day period)
  - "My Books" section to track borrowed books
  - Return books functionality
  - Overdue notifications
  - Prevent duplicate borrowing

### 👨‍💼 Admin Features
- **Authentication**
  - Admin Login & Registration
  - Secure admin-only access
  
- **Book Management**
  - Add new books to library
  - Update book information
  - Delete books
  - Track total and available copies
  - View borrowing statistics
  - Manage book categories

### 🔒 Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Protected API endpoints
- Role-based access control
- Input validation

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI Library
- **Vite** 7.2.4 - Build Tool & Dev Server
- **React Router DOM** - Client-side Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime Environment
- **Express.js** 5.2.1 - Web Framework
- **MongoDB** with Mongoose 9.0.2 - Database
- **bcryptjs** - Password Hashing
- **JSON Web Tokens (JWT)** - Authentication
- **CORS** - Cross-Origin Resource Sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/kathirvel962/librarymanagementsystem-MERN.git
cd librarymanagementsystem-MERN
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/libraryDB
JWT_SECRET=library_secret_key
```

### 3. Frontend Setup
```bash
cd frontend/vite-project
npm install
```

## 🚀 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on **http://localhost:5000**

### Start Frontend Server
```bash
cd frontend/vite-project
npm run dev
```
Frontend will run on **http://localhost:5173** (or 5174)

## 📁 Project Structure

```
LibraryManagementSystemUsingMern/
├── backend/
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/
│   │   ├── Admin.js               # Admin schema
│   │   ├── Student.js             # Student schema with borrowed books
│   │   └── Book.js                # Book schema with borrowing tracking
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication endpoints
│   │   └── bookRoutes.js          # Book management endpoints
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── server.js                  # Express server
│
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── pages/
        │   │   ├── HomePage.jsx           # Landing page
        │   │   ├── RoleSelection.jsx      # Role selection
        │   │   ├── LoginSelection.jsx     # Login type selection
        │   │   ├── Login.jsx              # Login page
        │   │   ├── Signup.jsx             # Signup page
        │   │   ├── AdminDashboard.jsx     # Admin dashboard
        │   │   └── StudentDashboard.jsx   # Student dashboard
        │   ├── App.jsx                    # Main app component
        │   └── main.jsx                   # Entry point
        ├── .env                           # Environment variables
        └── package.json
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/admin/register` | Register new admin | Public |
| POST | `/api/auth/admin/login` | Admin login | Public |
| POST | `/api/auth/student/register` | Register new student | Public |
| POST | `/api/auth/student/login` | Student login | Public |

### Book Routes (`/api/books`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/books` | Get all books (with filters) | Public |
| GET | `/api/books/:id` | Get single book | Public |
| POST | `/api/books` | Add new book | Admin |
| PUT | `/api/books/:id` | Update book | Admin |
| DELETE | `/api/books/:id` | Delete book | Admin |
| POST | `/api/books/:id/borrow` | Borrow a book | Student |
| POST | `/api/books/:id/return` | Return a book | Student |
| GET | `/api/books/student/borrowed` | Get student's borrowed books | Student |
| GET | `/api/books/stats/overview` | Get library statistics | Admin |

## 📝 Usage

### For Students
1. **Register/Login**: Create account or login
2. **Browse Books**: Search and filter books by category
3. **Borrow Books**: Click on a book and borrow (14-day period)
4. **My Books**: View borrowed books with due dates
5. **Return Books**: Return books when done

### For Admins
1. **Register/Login**: Create admin account or login
2. **Add Books**: Add new books to the library
3. **Manage Books**: Edit or delete existing books
4. **View Statistics**: Track library usage and borrowing stats

## 🔒 Security Features

- Passwords are hashed using bcryptjs before storing
- JWT tokens for secure authentication
- Protected routes with middleware
- Role-based access control (Admin/Student)
- Input validation on both client and server

## 🌐 Environment Variables

### Backend `.env`
```env
JWT_SECRET=your_jwt_secret_key
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:5000
```

## 🐛 Known Issues & Solutions

### MongoDB Connection Error
If you see IP whitelist errors:
1. Login to MongoDB Atlas
2. Go to Network Access
3. Add your current IP address or allow all (0.0.0.0/0)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kathirvel**
- GitHub: [@kathirvel962](https://github.com/kathirvel962)
- Repository: [librarymanagementsystem-MERN](https://github.com/kathirvel962/librarymanagementsystem-MERN)

## 🙏 Acknowledgments

- MongoDB for database
- React team for the amazing frontend library
- Express.js community
- Tailwind CSS for styling

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kathirvel**
- GitHub: [@kathirvel962](https://github.com/kathirvel962)

## 📞 Support

For support, email or raise an issue in the repository.
