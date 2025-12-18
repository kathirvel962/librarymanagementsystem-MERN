import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/student/login",
        { email, password }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "student");
      alert("Student Logged In Successfully!");
      // You can navigate to student dashboard here
      // navigate("/student-dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Login</h2>
      <div style={{ marginTop: "20px" }}>
        <input 
          placeholder="Email" 
          onChange={e => setEmail(e.target.value)}
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
        <Link to="/student-signup" style={{ fontSize: "14px" }}>
          Don't have an account? Sign up here
        </Link>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
