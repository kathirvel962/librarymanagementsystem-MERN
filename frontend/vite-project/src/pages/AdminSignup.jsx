import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/register",
        { username, password }
      );
      setSuccess(res.data.message);
      setTimeout(() => {
        navigate("/admin-login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Sign Up</h2>
      <div style={{ marginTop: "20px" }}>
        <input 
          placeholder="Username" 
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)} 
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          type="password" 
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)} 
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <button onClick={handleSignup} style={{ padding: "10px 30px", margin: "10px", cursor: "pointer" }}>
          Sign Up
        </button>
        <br />
        <Link to="/admin-login" style={{ fontSize: "14px" }}>
          Already have an account? Login here
        </Link>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
      </div>
    </div>
  );
}
