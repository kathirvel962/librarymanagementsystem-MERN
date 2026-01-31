import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { notifySuccess, notifyError } from "../utils/toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const endpoint = role === "admin" ? "admin/login" : "student/login";
      const payload = role === "admin" 
        ? { username: formData.username, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(`${API_URL}/api/auth/${endpoint}`, payload);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", role);
        notifySuccess(`${role === "admin" ? "Admin" : "Student"} login successful!`);
        navigate(role === "admin" ? "/admin-dashboard" : "/student-dashboard");
      }
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        const msg = "Cannot connect to server. Please make sure the backend is running.";
        setError(msg);
        notifyError(msg);
      } else {
        const msg = err.response?.data?.message || "Login failed. Please try again.";
        setError(msg);
        notifyError(msg);
      }
    }
  };

  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isAdmin ? "Admin" : "Student"} Login
        </h2>
        <p className="text-center text-gray-600 mb-6">Welcome back! Please login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isAdmin ? (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate(`/signup?role=${role}`)}
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign up here
          </button>
        </p>

        <button
          onClick={() => navigate("/login-selection")}
          className="w-full mt-4 text-gray-600 hover:text-indigo-600 font-medium"
        >
          ← Change Role
        </button>
      </div>
    </div>
  );
}
