import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginSelection from "./pages/LoginSelection";
import RoleSelection from "./pages/RoleSelection";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login-selection" element={<LoginSelection />} />
        <Route path="/signup-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Dashboard routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/student-dashboard" replace />} />
        
        {/* Legacy routes for backward compatibility */}
        <Route path="/student-login" element={<Navigate to="/login?role=student" replace />} />
        <Route path="/admin-login" element={<Navigate to="/login?role=admin" replace />} />
        <Route path="/student-signup" element={<Navigate to="/signup?role=student" replace />} />
        <Route path="/admin-signup" element={<Navigate to="/signup?role=admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

