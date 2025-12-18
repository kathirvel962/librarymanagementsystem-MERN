import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        { username, password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");
      alert("Admin Logged In Successfully!");
      // You can navigate to admin dashboard here
      // navigate("/admin-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Login</h2>
      <div style={{ marginTop: "20px" }}>
        <input 
          placeholder="Username" 
          onChange={e => setUsername(e.target.value)}
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <input 
          type="password" 
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} 
          style={{ padding: "10px", margin: "10px", width: "250px" }}
        />
        <br />
        <button onClick={login} style={{ padding: "10px 30px", margin: "10px", cursor: "pointer" }}>
          Login
        </button>
        <br />
        <Link to="/admin-signup" style={{ fontSize: "14px" }}>
          Don't have an account? Sign up here
        </Link>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
