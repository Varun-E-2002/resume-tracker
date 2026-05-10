import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // ❗ TEMP STORE
    localStorage.setItem("user", JSON.stringify({ email, password }));

    alert("Signup Successful ✅");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="right">
        <form onSubmit={handleSignup}>
          <h2>Create Account</h2>

          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;