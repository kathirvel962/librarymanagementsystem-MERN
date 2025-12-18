import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/student/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "student");
      alert("Student Logged In Successfully!");
      // Navigate to student dashboard
      // navigate("/student-dashboard");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        setError("Cannot connect to server. Please make sure the backend is running.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500">
      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Student Login
          </h2>
          <p className="text-gray-600 text-sm">Welcome back! Please login to your account</p>
        </div>
        
        {/* Form */}
        <div className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              type="email"
              placeholder="Enter your email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* Login Button */}
          <button 
            onClick={login} 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition"
          >
            Login
          </button>
          
          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-pink-500 font-medium hover:text-pink-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
