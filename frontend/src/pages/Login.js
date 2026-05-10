import { useState } from "react";
import "./auth.css";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SIGNUP =================
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅");

        // clear form
        setForm({
          username: "",
          email: "",
          password: "",
        });

        // switch to login
        setIsSignup(false);

      } else {
        alert(data.error || "Signup failed ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // ✅ EMAIL LOGIN
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful ✅");

        // save logged user
        localStorage.setItem("user", JSON.stringify(data));

        // redirect dashboard
        window.location.href = "/dashboard";

      } else {
        alert(data.error || "Login failed ❌");
      }

    } catch (error) {
      console.log(error);
      alert("Backend server error ❌");
    }
  };

  return (
    <div className="main">

      {/* LEFT SIDE */}
      <div className="left-section">

        <div className="logo">
          JobTrack
        </div>

        <button className="tag">
          Smart Job Tracking
        </button>

        <h1>
          Track. Analyze. <br />
          <span>Get Hired.</span>
        </h1>

        <p>
          JobTrack helps you manage your applications,
          analyze resume match score, and improve your
          hiring chances.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">

        <form
          className="card"
          onSubmit={isSignup ? handleSignup : handleLogin}
        >

          <h2>
            {isSignup ? "Create Account" : "Welcome Back!"}
          </h2>

          {/* SIGNUP ONLY */}
          {isSignup && (
            <>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </>
          )}

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className="signup">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <span
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? " Login" : " Sign Up"}
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;