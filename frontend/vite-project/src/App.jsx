import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentSignup from "./pages/StudentSignup";
import AdminSignup from "./pages/AdminSignup";
import RoleSelection from "./pages/RoleSelection";
import LoginSelection from "./pages/LoginSelection";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginSelection />} />
        <Route path="/signup" element={<RoleSelection />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
