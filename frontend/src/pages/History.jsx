import { Link } from "react-router-dom";

function History() {
  const historyItems = [
    {
      type: "resume",
      icon: "📄",
      title: "Resume Analysis",
      name: "My_Resume.pdf",
      score: "87",
      label: "ATS Score",
      date: "15 Aug 2026",
      status: "Excellent",
    },
    {
      type: "interview",
      icon: "💬",
      title: "Mock Interview",
      name: "Software Developer",
      score: "82",
      label: "Interview Score",
      date: "15 Aug 2026",
      status: "Good",
    },
    {
      type: "resume",
      icon: "📄",
      title: "Resume Analysis",
      name: "Resume_Final.pdf",
      score: "78",
      label: "ATS Score",
      date: "12 Aug 2026",
      status: "Good",
    },
  ];

  return (
    <div className="history-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <Link to="/" className="dashboard-logo">
          Resume<span>IQ</span>
        </Link>

        <div className="dashboard-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/upload-resume">
            Upload Resume
          </Link>

          <Link to="/analysis">
            Analysis
          </Link>

          <Link to="/interview">
            Interview
          </Link>

          <Link
            to="/history"
            className="active-nav-link"
          >
            History
          </Link>

        </div>

      </nav>


      {/* Main */}
      <main className="history-container">

        <div className="history-header">

          <div>

            <span className="upload-badge">
              Your Activity
            </span>

            <h1>
              History
            </h1>

            <p>
              View your previous resume analyses and
              interview sessions.
            </p>

          </div>

          <Link
            to="/upload-resume"
            className="history-upload-btn"
          >
            + Upload Resume
          </Link>

        </div>


        {/* Summary */}
        <section className="history-summary">

          <div className="history-summary-card">

            <span className="history-summary-icon">
              📄
            </span>

            <div>
              <strong>2</strong>
              <p>Resume Analyses</p>
            </div>

          </div>


          <div className="history-summary-card">

            <span className="history-summary-icon">
              💬
            </span>

            <div>
              <strong>1</strong>
              <p>Interviews</p>
            </div>

          </div>


          <div className="history-summary-card">

            <span className="history-summary-icon">
              🎯
            </span>

            <div>
              <strong>87</strong>
              <p>Best ATS Score</p>
            </div>

          </div>

        </section>


        {/* History list */}
        <section className="history-list">

          <div className="history-list-header">

            <h2>
              Recent Activity
            </h2>

            <span>
              3 activities
            </span>

          </div>


          {historyItems.map((item, index) => (

            <div
              className="history-item"
              key={index}
            >

              <div className="history-item-icon">
                {item.icon}
              </div>


              <div className="history-item-info">

                <div className="history-item-title">

                  <h3>
                    {item.title}
                  </h3>

                  <span
                    className={`history-status ${
                      item.status === "Excellent"
                        ? "excellent"
                        : "good"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <p>
                  {item.name}
                </p>

                <span className="history-date">
                  {item.date}
                </span>

              </div>


              <div className="history-item-score">

                <strong>
                  {item.score}
                </strong>

                <span>
                  {item.label}
                </span>

              </div>


              <div className="history-item-action">

                {item.type === "resume" ? (

                  <Link to="/analysis">
                    View Analysis →
                  </Link>

                ) : (

                  <Link to="/interview/result">
                    View Result →
                  </Link>

                )}

              </div>

            </div>

          ))}

        </section>


        {/* Empty future state */}
        <div className="history-note">

          <span>
            💡
          </span>

          <div>
            <strong>
              Keep improving!
            </strong>

            <p>
              Your history will automatically update whenever
              you analyze a resume or complete an interview.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default History;