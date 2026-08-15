import { Link } from "react-router-dom";

function InterviewResult() {
  return (
    <div className="interview-result-page">

      <nav className="dashboard-navbar">

        <Link to="/" className="dashboard-logo">
          Resume<span>IQ</span>
        </Link>

        <div className="dashboard-nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/analysis">Analysis</Link>
          <Link to="/history">History</Link>
          <Link to="/profile">Profile</Link>
        </div>

      </nav>


      <main className="result-container">

        <div className="result-header">

          <span className="upload-badge">
            Interview Completed
          </span>

          <div className="result-success-icon">
            ✓
          </div>

          <h1>
            Great Job! 🎉
          </h1>

          <p>
            You've completed your mock interview.
            Here's your performance summary.
          </p>

        </div>


        {/* Score */}
        <section className="result-score-card">

          <div className="result-score-circle">

            <div>
              <strong>82</strong>
              <span>/ 100</span>
            </div>

          </div>

          <div className="result-score-info">

            <span className="analysis-label">
              OVERALL SCORE
            </span>

            <h2>
              Good Performance
            </h2>

            <p>
              You have a solid understanding of the
              core concepts. Keep practicing to improve
              your interview confidence.
            </p>

          </div>

        </section>


        {/* Stats */}
        <section className="result-stats">

          <div className="result-stat-card">
            <span>✓</span>
            <strong>4</strong>
            <p>Correct Answers</p>
          </div>

          <div className="result-stat-card">
            <span>💬</span>
            <strong>5</strong>
            <p>Total Questions</p>
          </div>

          <div className="result-stat-card">
            <span>⏱️</span>
            <strong>18</strong>
            <p>Minutes</p>
          </div>

          <div className="result-stat-card">
            <span>🎯</span>
            <strong>82%</strong>
            <p>Accuracy</p>
          </div>

        </section>


        {/* Performance */}
        <section className="result-section">

          <div className="result-section-title">

            <span className="analysis-label">
              PERFORMANCE
            </span>

            <h2>
              Your Strengths
            </h2>

          </div>


          <div className="result-strengths">

            <div className="strength-card">
              <div>💻</div>
              <h3>Technical Knowledge</h3>
              <p>
                You demonstrated a good understanding
                of programming concepts.
              </p>
            </div>

            <div className="strength-card">
              <div>🧠</div>
              <h3>Problem Solving</h3>
              <p>
                Your answers showed logical thinking
                and structured problem solving.
              </p>
            </div>

            <div className="strength-card">
              <div>⚡</div>
              <h3>Confidence</h3>
              <p>
                Your responses were clear and focused
                on the question.
              </p>
            </div>

          </div>

        </section>


        {/* Improvements */}
        <section className="result-section">

          <div className="result-section-title">

            <span className="analysis-label">
              AI FEEDBACK
            </span>

            <h2>
              Areas to Improve
            </h2>

          </div>


          <div className="improvement-list">

            <div className="improvement-item">
              <span>01</span>
              <div>
                <h3>Spring Boot</h3>
                <p>
                  Practice dependency injection,
                  Spring Security and REST API concepts.
                </p>
              </div>
            </div>

            <div className="improvement-item">
              <span>02</span>
              <div>
                <h3>System Design</h3>
                <p>
                  Improve your understanding of scalable
                  application architecture.
                </p>
              </div>
            </div>

            <div className="improvement-item">
              <span>03</span>
              <div>
                <h3>Communication</h3>
                <p>
                  Try to give more structured answers
                  with examples from real projects.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* Actions */}
        <div className="result-actions">

          <Link
            to="/interview"
            className="secondary-analysis-btn"
          >
            ↻ Try Again
          </Link>

          <Link
            to="/dashboard"
            className="primary-analysis-btn"
          >
            Back to Dashboard
            <span>→</span>
          </Link>

        </div>

      </main>

    </div>
  );
}

export default InterviewResult;