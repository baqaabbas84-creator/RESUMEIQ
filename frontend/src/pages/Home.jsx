import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <Link to="/" className="logo">
          Resume<span>IQ</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="active">
            Home
          </Link>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register" className="register-btn">
            Get Started
          </Link>
        </div>

      </nav>


      {/* ================= HERO ================= */}
      <main className="hero">

        {/* Decorative shapes */}
        <div className="hero-blob blob-left"></div>
        <div className="hero-blob blob-right"></div>

        <div className="floating-circle circle-one"></div>
        <div className="floating-circle circle-two"></div>
        <div className="floating-circle circle-three"></div>
        <div className="floating-circle circle-four"></div>

        <div className="sparkle sparkle-one">✦</div>
        <div className="sparkle sparkle-two">✦</div>
        <div className="sparkle sparkle-three">✦</div>


        {/* ================= HERO CONTENT ================= */}
        <div className="hero-content">

          <div className="badge">
            <span>✦</span>
            AI-Powered Career Platform
          </div>

          <h1>
            Build a Better Career
            <br />
            with{" "}
            <span className="gradient-text">
              ResumeIQ
            </span>
          </h1>

          <p className="hero-description">
            Upload your resume, analyze your ATS score,
            discover skill gaps, and prepare for interviews
            using AI.
          </p>


          {/* Buttons */}
          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >
              <span className="btn-icon">☁</span>
              Analyze My Resume
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              <span className="arrow-icon">→</span>
              Login
            </Link>

          </div>

        </div>


        {/* ================= DECORATIVE WAVES ================= */}

        <div className="wave-decoration wave-left">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="wave-decoration wave-right">
          <span></span>
          <span></span>
          <span></span>
        </div>


        {/* ================= FEATURE CARDS ================= */}

        <div className="features">

          {/* Card 1 */}
          <div className="feature-card card-purple">

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Resume Analysis
            </h3>

            <p>
              Upload your PDF or DOCX resume
              and get AI-powered analysis.
            </p>

            <div className="card-line"></div>

          </div>


          {/* Card 2 */}
          <div className="feature-card card-green">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              ATS Score
            </h3>

            <p>
              Check how well your resume
              performs against ATS systems.
            </p>

            <div className="card-line"></div>

          </div>


          {/* Card 3 */}
          <div className="feature-card card-orange">

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              Skill Gap
            </h3>

            <p>
              Identify missing skills and
              understand what you need to improve.
            </p>

            <div className="card-line"></div>

          </div>


          {/* Card 4 */}
          <div className="feature-card card-blue">

            <div className="feature-icon">
              💬
            </div>

            <h3>
              Interview Prep
            </h3>

            <p>
              Generate personalized interview
              questions using AI.
            </p>

            <div className="card-line"></div>

          </div>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-wave"></div>

        <p>
          © 2026 ResumeIQ. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;