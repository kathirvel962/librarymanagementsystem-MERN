import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
        "http://localhost:5000/api/auth/student/register",
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
        navigate("/student-login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Sign Up</h2>
      <div style={{ marginTop: "20px" }}>
        <input 
          name="name"
          placeholder="Full Name" 
          value={formData.name}
          onChange={handleChange}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          name="rollNo"
          placeholder="Roll Number" 
          value={formData.rollNo}
          onChange={handleChange}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          name="department"
          placeholder="Department" 
          value={formData.department}
          onChange={handleChange}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          name="email"
          type="email"
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          name="password"
          type="password" 
          placeholder="Password"
          value={formData.password}
          onChange={handleChange} 
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          name="confirmPassword"
          type="password" 
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange} 
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <button onClick={handleSignup} style={{ padding: "10px 30px", margin: "10px", cursor: "pointer" }}>
          Sign Up
        </button>
        <br />
        <Link to="/student-login" style={{ fontSize: "14px" }}>
          Already have an account? Login here
        </Link>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      </div>
    </div>
  );
}
