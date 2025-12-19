import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginSelection from "./pages/LoginSelection";
import RoleSelection from "./pages/RoleSelection";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login-selection" replace />} />
        <Route path="/login-selection" element={<LoginSelection />} />
        <Route path="/signup-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
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
