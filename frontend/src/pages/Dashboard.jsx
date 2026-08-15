import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <Link to="/" className="dashboard-logo">
          Resume<span>IQ</span>
        </Link>

        <div className="dashboard-nav-links">

          <Link to="/" className="active">
            Home
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <Link to="/login" className="logout-link">
            Logout
          </Link>

        </div>

      </nav>


      {/* Main */}
      <main className="dashboard-container">

        {/* Welcome */}
        <section className="dashboard-welcome">

          <div>
            <p className="dashboard-badge">
              AI Career Assistant
            </p>

            <h1>
              Welcome back 👋
            </h1>

            <p>
              Improve your resume and prepare for your
              next career opportunity.
            </p>
          </div>

        </section>


        {/* Statistics */}
        <section className="dashboard-stats">

          <div className="stat-card">

            <div className="stat-icon purple">
              📊
            </div>

            <div>
              <span>
                ATS Score
              </span>

              <strong>
                --
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon blue">
              📄
            </div>

            <div>
              <span>
                Resumes
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon pink">
              💬
            </div>

            <div>
              <span>
                Interviews
              </span>

              <strong>
                0
              </strong>
            </div>

          </div>

        </section>


        {/* Upload Resume */}
        <section className="upload-dashboard-card">

          <div className="upload-dashboard-icon">
            📄
          </div>

          <h2>
            Upload Your Resume
          </h2>

          <p>
            Upload your latest resume and let ResumeIQ
            analyze it using AI.
          </p>

          <span className="upload-format">
            PDF or DOCX • Maximum 10 MB
          </span>

          <Link
            to="/upload-resume"
            className="dashboard-upload-btn"
          >
            Upload Resume
            <span>→</span>
          </Link>

        </section>


        {/* Quick Actions */}
        <section className="quick-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="quick-action-grid">

            <Link
              to="/upload-resume"
              className="quick-action-card"
            >

              <div>
                📄
              </div>

              <section>
                <h3>
                  Analyze Resume
                </h3>

                <p>
                  Check your ATS score and resume quality.
                </p>
              </section>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/interview"
              className="quick-action-card"
            >

              <div>
                💬
              </div>

              <section>
                <h3>
                  Practice Interview
                </h3>

                <p>
                  Generate AI-powered interview questions.
                </p>
              </section>

              <span>
                →
              </span>

            </Link>

          </div>

        </section>


        {/* Recent Analysis */}
        <section className="recent-analysis">

          <div className="section-heading">

            <div>
              <h2>
                Recent Analysis
              </h2>

              <p>
                Your latest resume analysis results.
              </p>
            </div>

            <Link to="/history">
              View History →
            </Link>

          </div>


          <div className="empty-analysis">

            <div>
              📝
            </div>

            <h3>
              No analysis yet
            </h3>

            <p>
              Upload your resume to get your first
              AI-powered analysis.
            </p>

            <Link
              to="/upload-resume"
              className="empty-analysis-btn"
            >
              Analyze My Resume
            </Link>

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer className="dashboard-footer">

        <p>
          © 2026 ResumeIQ. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Dashboard;