# Library Management System - MERN Stack

A full-stack Library Management System built with MongoDB, Express.js, React, and Node.js. This application provides authentication features for both students and administrators.

## 🚀 Features


- 
 **Student Authentication**
  - Student Login
  - Student Registration with full details (Name, Roll No, Department, Email)
  
- ✅ **Admin Authentication**
  - Admin Login
  - Admin Registration
  
- ✅ **Security Features**
  - Password hashing with bcrypt
  - JWT token-based authentication
  - Password validation and confirmation
  - Secure API endpoints

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Vite 7.2.4
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js 5.2.1
- MongoDB with Mongoose 9.0.2
- bcryptjs for password hashing
- JSON Web Tokens (JWT)
- CORS enabled

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
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   └── Student.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── pages/
        │   │   ├── AdminLogin.jsx
        │   │   ├── AdminSignup.jsx
        │   │   ├── StudentLogin.jsx
        │   │   └── StudentSignup.jsx
        │   ├── App.jsx
        │   └── main.jsx
        └── package.json
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/admin/register` | Register new admin |
| POST | `/api/auth/admin/login` | Admin login |
| POST | `/api/auth/student/register` | Register new student |
| POST | `/api/auth/student/login` | Student login |

## 📝 Usage

### Admin Registration
1. Navigate to Admin Sign Up page
2. Enter username and password (min 6 characters)
3. Confirm password
4. Click Sign Up

### Student Registration
1. Navigate to Student Sign Up page
2. Fill in all required fields:
   - Full Name
   - Roll Number
   - Department
   - Email
   - Password (min 6 characters)
   - Confirm Password
3. Click Sign Up

### Login
After registration, users can log in with their credentials. Upon successful login, a JWT token is stored in localStorage.

## 🔒 Security

- Passwords are hashed using bcryptjs before storing
- JWT tokens for secure authentication
- Password validation (minimum 6 characters)
- Duplicate username/email/roll number checking

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Kathirvel**
- GitHub: [@kathirvel962](https://github.com/kathirvel962)

## 📞 Support

For support, email or raise an issue in the repository.
