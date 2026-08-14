import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Resume<span>IQ</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-btn">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-content">
          <p className="badge">AI-Powered Career Platform</p>

          <h1>RESUMEIQ TEST 12345</h1>

          <p className="hero-description">
            Upload your resume, analyze your ATS score, discover skill gaps,
            and prepare for interviews using AI.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Analyze My Resume
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="features">

          <div className="feature-card">
            <h3>📄 Resume Analysis</h3>
            <p>
              Upload your PDF or DOCX resume and get AI-powered analysis.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 ATS Score</h3>
            <p>
              Check how well your resume performs against ATS systems.
            </p>
          </div>

          <div className="feature-card">
            <h3>🎯 Skill Gap</h3>
            <p>
              Identify missing skills and understand what you need to improve.
            </p>
          </div>

          <div className="feature-card">
            <h3>💬 Interview Prep</h3>
            <p>
              Generate personalized interview questions using AI.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 ResumeIQ. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;