import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSent(true);
  };

  return (
    <div className="auth-page">

      {/* Background decoration */}
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>
      <div className="auth-orb auth-orb-three"></div>


      <div className="auth-card forgot-card">

        {/* Logo */}
        <Link to="/" className="auth-logo">
          Resume<span>IQ</span>
        </Link>


        {!sent ? (
          <>
            {/* Icon */}
            <div className="forgot-icon">
              🔐
            </div>


            {/* Header */}
            <div className="auth-header">

              <h1>
                Forgot Password?
              </h1>

              <p>
                No worries! Enter your registered email
                and we'll help you reset your password.
              </p>

            </div>


            {/* Form */}
            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label htmlFor="forgot-email">
                  Email Address
                </label>

                <input
                  id="forgot-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              <button
                type="submit"
                className="auth-btn"
              >
                Send Reset Link
                <span>→</span>
              </button>

            </form>


            {/* Footer */}
            <div className="auth-footer">

              <Link
                to="/login"
                className="back-login"
              >
                ← Back to Login
              </Link>

            </div>
          </>
        ) : (

          /* SUCCESS */
          <div className="forgot-success">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Check Your Email
            </h1>

            <p>
              If an account exists for{" "}
              <strong>{email}</strong>,
              we've sent instructions to reset
              your password.
            </p>

            <Link
              to="/login"
              className="auth-btn success-btn"
            >
              Back to Login
            </Link>

          </div>

        )}

      </div>

    </div>
  );
}

export default ForgotPassword;