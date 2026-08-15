import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all the fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Registration form is working!");
  };

  return (
    <div className="auth-page">

      {/* Background decoration */}
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>
      <div className="auth-orb auth-orb-three"></div>

      <div className="auth-card register-card">

        {/* Logo */}
        <Link to="/" className="auth-logo">
          Resume<span>IQ</span>
        </Link>

        {/* Header */}
        <div className="auth-header">

          <div className="auth-icon">
            ✨
          </div>

          <h1>Create Account</h1>

          <p>
            Start your journey towards a better career.
          </p>

        </div>


        {/* Error */}
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}


        {/* Form */}
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Name */}
          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>


          {/* Email */}
          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>


          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>


          {/* Confirm Password */}
          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>


          {/* Button */}
          <button
            type="submit"
            className="auth-btn"
          >
            Create Account
            <span>→</span>
          </button>

        </form>


        {/* Footer */}
        <div className="auth-footer">

          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
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

export default Register;