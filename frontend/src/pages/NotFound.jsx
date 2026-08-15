import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">

      {/* Background decorations */}
      <div className="not-found-orb orb-one"></div>
      <div className="not-found-orb orb-two"></div>
      <div className="not-found-grid"></div>


      {/* Main Card */}
      <main className="not-found-card">

        {/* Logo */}
        <Link to="/" className="not-found-logo">
          Resume<span>IQ</span>
        </Link>


        {/* 404 Number */}
        <div className="not-found-number">
          404
        </div>


        {/* Icon */}
        <div className="not-found-icon">
          🔍
        </div>


        {/* Badge */}
        <span className="not-found-badge">
          Oops! Page Not Found
        </span>


        {/* Heading */}
        <h1>
          Looks like you took a wrong turn.
        </h1>


        {/* Description */}
        <p className="not-found-description">
          The page you're looking for doesn't exist,
          has been moved, or the link may be incorrect.
        </p>


        {/* Main Buttons */}
        <div className="not-found-actions">

          <Link
            to="/"
            className="not-found-primary-btn"
          >
            ← Back to Home
          </Link>

          <Link
            to="/dashboard"
            className="not-found-secondary-btn"
          >
            Go to Dashboard
          </Link>

        </div>


        {/* Quick Links */}
        <div className="not-found-divider">
          <span>Quick Links</span>
        </div>


        <div className="not-found-links">

          <Link to="/upload-resume">
            📄 Resume Analysis
          </Link>

          <Link to="/interview">
            💬 Interview Prep
          </Link>

          <Link to="/history">
            📊 History
          </Link>

          <Link to="/profile">
            👤 Profile
          </Link>

        </div>


        {/* Footer */}
        <div className="not-found-footer">

          <span>
            ResumeIQ
          </span>

          <span>
            •
          </span>

          <span>
            Build a better career with AI
          </span>

        </div>

      </main>

    </div>
  );
}

export default NotFound;