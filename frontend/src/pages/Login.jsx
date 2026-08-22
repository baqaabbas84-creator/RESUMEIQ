import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");

    try {
      await login(email, password);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    }
  };

  return (
    <div className="auth-page">

      {/* Background decoration */}
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>
      <div className="auth-orb auth-orb-three"></div>

      <div className="auth-card">

        {/* Logo */}
        <Link to="/" className="auth-logo">
          Resume<span>IQ</span>
        </Link>

        {/* Header */}
        <div className="auth-header">

          <div className="auth-icon">
            👋
          </div>

          <h1>Welcome Back</h1>

          <p>
            Login to continue your career journey.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />

          </div>

          {/* Password */}
          <div className="form-group">

            <div className="password-label">

              <label htmlFor="password">
                Password
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>

            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}

            {!loading && (
              <span>→</span>
            )}
          </button>

        </form>

        {/* Footer */}
        <div className="auth-footer">

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;