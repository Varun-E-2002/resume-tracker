import React, { useState } from "react";
import "../styles/auth.css";

export default function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="container">
      {/* LEFT PANEL */}
      <div className="left-panel">
        {isSignup ? (
          <div>
            <h2>Welcome Back!</h2>
            <p>Already have an account?</p>
            <button onClick={() => setIsSignup(false)}>Login</button>
          </div>
        ) : (
          <div>
            <h2>Hello, Friend!</h2>
            <p>Don't have an account?</p>
            <button onClick={() => setIsSignup(true)}>Sign Up</button>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="form-box">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>

          {isSignup && <input type="text" placeholder="Name" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}