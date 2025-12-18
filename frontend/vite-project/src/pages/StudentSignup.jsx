import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.rollNo || !formData.department || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/auth/student/register`,
        {
          name: formData.name,
          rollNo: formData.rollNo,
          department: formData.department,
          email: formData.email,
          password: formData.password
        }
      );
      setSuccess(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
      } else if (err.request) {
        setError("Cannot connect to server. Please make sure the backend is running.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500 py-8">
      {/* Signup Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎓</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Student Sign Up
          </h2>
          <p className="text-gray-600 text-sm">Create your student account</p>
        </div>
        
        {/* Form */}
        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input 
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Roll Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Roll Number</label>
            <input 
              name="rollNo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              placeholder="Enter your roll number" 
              value={formData.rollNo}
              onChange={handleChange}
            />
          </div>

          {/* Department Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
            <input 
              name="department"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              placeholder="Enter your department" 
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input 
              name="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input 
              name="password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange} 
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange} 
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          {/* Signup Button */}
          <button 
            onClick={handleSignup} 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-lg transition mt-2"
          >
            Sign Up
          </button>
          
          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-500 font-medium hover:text-pink-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
