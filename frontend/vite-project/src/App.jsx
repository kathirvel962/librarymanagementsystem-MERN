import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentSignup from "./pages/StudentSignup";
import AdminSignup from "./pages/AdminSignup";
import "./App.css";

function Home() {
  const [showStudent, setShowStudent] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Library Management System</h1>
      
      {!showStudent && !showAdmin && (
        <div style={{ marginTop: "50px" }}>
          <button 
            onClick={() => setShowStudent(true)}
            style={{ 
              margin: "20px", 
              padding: "20px 40px", 
              fontSize: "20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Student
          </button>
          <button 
            onClick={() => setShowAdmin(true)}
            style={{ 
              margin: "20px", 
              padding: "20px 40px", 
              fontSize: "20px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Admin
          </button>
        </div>
      )}

      {showStudent && (
        <div style={{ marginTop: "50px" }}>
          <h2>Student Portal</h2>
          <Link to="/student-login">
            <button style={{ 
              margin: "15px", 
              padding: "15px 30px", 
              fontSize: "18px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Student Login
            </button>
          </Link>
          <br />
          <Link to="/student-signup">
            <button style={{ 
              margin: "15px", 
              padding: "15px 30px", 
              fontSize: "18px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Student Sign Up
            </button>
          </Link>
          <br />
          <button 
            onClick={() => setShowStudent(false)}
            style={{ 
              marginTop: "20px", 
              padding: "8px 20px", 
              fontSize: "14px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Back
          </button>
        </div>
      )}

      {showAdmin && (
        <div style={{ marginTop: "50px" }}>
          <h2>Admin Portal</h2>
          <Link to="/admin-login">
            <button style={{ 
              margin: "15px", 
              padding: "15px 30px", 
              fontSize: "18px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Admin Login
            </button>
          </Link>
          <br />
          <Link to="/admin-signup">
            <button style={{ 
              margin: "15px", 
              padding: "15px 30px", 
              fontSize: "18px", 
              backgroundColor: "#28a745", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Admin Sign Up
            </button>
          </Link>
          <br />
          <button 
            onClick={() => setShowAdmin(false)}
            style={{ 
              marginTop: "20px", 
              padding: "8px 20px", 
              fontSize: "14px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
