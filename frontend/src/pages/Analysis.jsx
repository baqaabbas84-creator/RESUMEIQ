import { Link } from "react-router-dom";

function Analysis() {
  const atsScore = 87;

  const skills = [
    { name: "Java", level: "Strong", width: "90%" },
    { name: "Spring Boot", level: "Good", width: "78%" },
    { name: "React", level: "Good", width: "72%" },
    { name: "SQL", level: "Strong", width: "88%" },
    { name: "AWS", level: "Needs Improvement", width: "48%" },
  ];

  const matchedKeywords = [
    "Java",
    "Spring Boot",
    "React",
    "SQL",
    "REST API",
    "Git",
  ];

  const missingKeywords = [
    "Docker",
    "AWS",
    "Kubernetes",
    "Microservices",
  ];

  const recommendations = [
    {
      icon: "📝",
      title: "Improve Resume Summary",
      text: "Make your professional summary more focused on measurable achievements and target job roles.",
    },
    {
      icon: "🎯",
      title: "Add Missing Skills",
      text: "Consider adding Docker, AWS and Microservices if you have relevant experience with them.",
    },
    {
      icon: "📊",
      title: "Add More Achievements",
      text: "Use numbers and measurable results to demonstrate the impact of your work.",
    },
  ];

  return (
    <div className="analysis-page">

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

          <Link to="/history">
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* Main */}
      <main className="analysis-container">

        {/* Header */}
        <section className="analysis-header">

          <span className="upload-badge">
            AI Resume Analysis
          </span>

          <h1>
            Resume Analysis
          </h1>

          <p>
            Here's how your resume currently performs and
            what you can improve.
          </p>

        </section>


        {/* Resume info */}
        <div className="analysis-file">

          <div className="analysis-file-icon">
            📄
          </div>

          <div>
            <h3>
              My_Resume.pdf
            </h3>

            <p>
              Analysis completed • Ready for improvements
            </p>
          </div>

          <Link to="/upload-resume">
            Analyze Another
          </Link>

        </div>


        {/* ATS Score */}
        <section className="ats-section">

          <div className="ats-score-card">

            <div className="ats-circle">

              <div className="ats-circle-inner">

                <strong>
                  {atsScore}
                </strong>

                <span>
                  / 100
                </span>

              </div>

            </div>

            <div className="ats-score-info">

              <span className="analysis-label">
                ATS SCORE
              </span>

              <h2>
                Excellent Resume
              </h2>

              <p>
                Your resume has a strong structure and
                contains most of the important keywords.
              </p>

              <div className="score-status">
                ✓ Good ATS Compatibility
              </div>

            </div>

          </div>


          {/* Score breakdown */}
          <div className="score-breakdown">

            <h3>
              Score Breakdown
            </h3>

            <div className="breakdown-item">

              <span>
                Keywords
              </span>

              <strong>
                90%
              </strong>

            </div>

            <div className="breakdown-bar">
              <div style={{ width: "90%" }}></div>
            </div>


            <div className="breakdown-item">

              <span>
                Formatting
              </span>

              <strong>
                92%
              </strong>

            </div>

            <div className="breakdown-bar">
              <div style={{ width: "92%" }}></div>
            </div>


            <div className="breakdown-item">

              <span>
                Skills
              </span>

              <strong>
                84%
              </strong>

            </div>

            <div className="breakdown-bar">
              <div style={{ width: "84%" }}></div>
            </div>


            <div className="breakdown-item">

              <span>
                Content
              </span>

              <strong>
                82%
              </strong>

            </div>

            <div className="breakdown-bar">
              <div style={{ width: "82%" }}></div>
            </div>

          </div>

        </section>


        {/* Keywords */}
        <section className="analysis-section">

          <div className="analysis-section-title">

            <div>
              <span className="analysis-label">
                KEYWORD ANALYSIS
              </span>

              <h2>
                Job-Relevant Keywords
              </h2>
            </div>

          </div>


          <div className="keyword-grid">

            <div className="keyword-card matched">

              <div className="keyword-card-header">

                <h3>
                  ✓ Matched Keywords
                </h3>

                <span>
                  {matchedKeywords.length}
                </span>

              </div>

              <div className="keyword-list">

                {matchedKeywords.map((keyword) => (
                  <span key={keyword}>
                    {keyword}
                  </span>
                ))}

              </div>

            </div>


            <div className="keyword-card missing">

              <div className="keyword-card-header">

                <h3>
                  + Missing Keywords
                </h3>

                <span>
                  {missingKeywords.length}
                </span>

              </div>

              <div className="keyword-list">

                {missingKeywords.map((keyword) => (
                  <span key={keyword}>
                    {keyword}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </section>


        {/* Skills */}
        <section className="analysis-section">

          <div className="analysis-section-title">

            <div>
              <span className="analysis-label">
                SKILL ANALYSIS
              </span>

              <h2>
                Your Skill Profile
              </h2>
            </div>

            <Link to="/interview">
              Prepare for Interview →
            </Link>

          </div>


          <div className="skills-card">

            {skills.map((skill) => (

              <div
                className="skill-row"
                key={skill.name}
              >

                <div className="skill-info">

                  <strong>
                    {skill.name}
                  </strong>

                  <span>
                    {skill.level}
                  </span>

                </div>

                <div className="skill-bar">

                  <div
                    style={{
                      width: skill.width,
                    }}
                  ></div>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* Recommendations */}
        <section className="analysis-section">

          <div className="analysis-section-title">

            <div>
              <span className="analysis-label">
                AI INSIGHTS
              </span>

              <h2>
                Recommendations
              </h2>
            </div>

          </div>


          <div className="recommendation-grid">

            {recommendations.map((item) => (

              <div
                className="recommendation-card"
                key={item.title}
              >

                <div className="recommendation-icon">
                  {item.icon}
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* Bottom actions */}
        <div className="analysis-actions">

          <Link
            to="/upload-resume"
            className="secondary-analysis-btn"
          >
            ← Upload Another Resume
          </Link>

          <Link
            to="/interview"
            className="primary-analysis-btn"
          >
            Start Interview Prep
            <span>→</span>
          </Link>

        </div>

      </main>

    </div>
  );
}

export default Analysis;