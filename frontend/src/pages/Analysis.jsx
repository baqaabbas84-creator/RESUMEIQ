import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getResumeById } from "../services/resumeService";

function Analysis() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        setLoading(true);
        setError("");

        const resumeId = localStorage.getItem("latestResumeId");

        if (!resumeId) {
          setError(
            "No resume analysis found. Please upload a resume first."
          );

          setLoading(false);
          return;
        }

        console.log("Loading resume:", resumeId);

        const data = await getResumeById(resumeId);

        console.log("Resume analysis:", data);

        setResume(data);
      } catch (err) {
        console.error("Analysis loading error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load resume analysis."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalysis();
  }, []);

  /* =========================================================
     LOADING STATE
     ========================================================= */

  if (loading) {
    return (
      <div className="analysis-page">
        <nav className="analysis-navbar">
          <Link to="/" className="dashboard-logo">
            Resume<span>IQ</span>
          </Link>
        </nav>

        <main className="analysis-container">
          <div className="analysis-loading">
            <div className="analysis-loader"></div>

            <h2>Analyzing Your Resume...</h2>

            <p>
              Please wait while we prepare your ATS report.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     ERROR STATE
     ========================================================= */

  if (error) {
    return (
      <div className="analysis-page">
        <nav className="analysis-navbar">
          <Link to="/" className="dashboard-logo">
            Resume<span>IQ</span>
          </Link>

          <div className="analysis-nav-links">
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/history">
              History
            </Link>

            <Link to="/profile">
              Profile
            </Link>
          </div>
        </nav>

        <main className="analysis-container">
          <div className="analysis-error-card">
            <div className="analysis-error-icon">
              ⚠️
            </div>

            <h2>
              Analysis Not Available
            </h2>

            <p>
              {error}
            </p>

            <button
              className="analysis-primary-btn"
              onClick={() =>
                navigate("/upload-resume")
              }
            >
              Upload Resume
              <span>→</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     RESUME DATA
     ========================================================= */

  const atsScore = Number(resume?.atsScore ?? 0);

  const atsAnalysis = resume?.atsAnalysis || {
    strengths: [],
    weaknesses: [],
    suggestions: [],
  };

  const skills = Array.isArray(resume?.skills)
    ? resume.skills
    : [];

  const education = Array.isArray(resume?.education)
    ? resume.education
    : [];

  const experience = Array.isArray(resume?.experience)
    ? resume.experience
    : [];

  const projects = Array.isArray(resume?.projects)
    ? resume.projects
    : [];

  const strengths = Array.isArray(
    atsAnalysis?.strengths
  )
    ? atsAnalysis.strengths
    : [];

  const weaknesses = Array.isArray(
    atsAnalysis?.weaknesses
  )
    ? atsAnalysis.weaknesses
    : [];

  const suggestions = Array.isArray(
    atsAnalysis?.suggestions
  )
    ? atsAnalysis.suggestions
    : [];

  /* =========================================================
     ATS RATING
     ========================================================= */

  let scoreRating = "Weak";

  if (atsScore >= 85) {
    scoreRating = "Excellent";
  } else if (atsScore >= 70) {
    scoreRating = "Good";
  } else if (atsScore >= 50) {
    scoreRating = "Needs Improvement";
  }

  /* =========================================================
     SCORE DESCRIPTION
     ========================================================= */

  let scoreDescription =
    "Your resume needs significant improvement.";

  if (atsScore >= 85) {
    scoreDescription =
      "Your resume is highly optimized for ATS systems.";
  } else if (atsScore >= 70) {
    scoreDescription =
      "Your resume has a strong ATS-friendly foundation.";
  } else if (atsScore >= 50) {
    scoreDescription =
      "Your resume has a good foundation, but several areas can be improved.";
  }

  /* =========================================================
     SCORE CIRCLE
     ========================================================= */

  const safeScore = Math.min(
    Math.max(atsScore, 0),
    100
  );

  const scoreAngle =
    `${safeScore * 3.6}deg`;

  return (
    <div className="analysis-page">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="analysis-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="analysis-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* =====================================================
          MAIN CONTAINER
          ===================================================== */}

      <main className="analysis-container">


        {/* ===================================================
            HEADER
            =================================================== */}

        <section className="analysis-header">

          <span className="analysis-badge">
            AI Resume Analysis
          </span>

          <h1>
            Your Resume Analysis
          </h1>

          <p>
            Here is how your resume performs against
            ATS-friendly resume standards.
          </p>

        </section>


        {/* ===================================================
            RESUME INFORMATION
            =================================================== */}

        <div className="analysis-resume-name">

          <div className="analysis-resume-file-icon">
            📄
          </div>

          <div>

            <strong>
              {resume?.title || "Resume"}
            </strong>

            <small>
              {resume?.file?.originalName ||
                resume?.originalName ||
                "Uploaded Resume"}
            </small>

          </div>

        </div>


        {/* ===================================================
            ATS SCORE
            =================================================== */}

        <section className="ats-score-card">

          <div
            className="ats-score-circle"
            style={{
              background: `
                conic-gradient(
                  #3b82f6 0deg,
                  #6366f1 ${scoreAngle},
                  #e2e8f0 ${scoreAngle},
                  #e2e8f0 360deg
                )
              `,
            }}
          >

            <div className="ats-score-number">
              {atsScore}
            </div>

            <div className="ats-score-total">
              /100
            </div>

          </div>


          <div className="ats-score-content">

            <span className="score-label">
              ATS SCORE
            </span>

            <h2>
              {scoreRating}
            </h2>

            <p>
              {scoreDescription}
            </p>

          </div>

        </section>


        {/* ===================================================
            STATISTICS
            =================================================== */}

        <section className="analysis-stats">

          <div className="analysis-stat-card">

            <span>
              Skills
            </span>

            <strong>
              {skills.length}
            </strong>

          </div>


          <div className="analysis-stat-card">

            <span>
              Education
            </span>

            <strong>
              {education.length}
            </strong>

          </div>


          <div className="analysis-stat-card">

            <span>
              Experience
            </span>

            <strong>
              {experience.length}
            </strong>

          </div>


          <div className="analysis-stat-card">

            <span>
              Projects
            </span>

            <strong>
              {projects.length}
            </strong>

          </div>

        </section>


        {/* ===================================================
            STRENGTHS
            =================================================== */}

        <section className="analysis-section">

          <div className="analysis-section-title">

            <div className="analysis-section-icon">
              ✓
            </div>

            <div>

              <h2>
                Strengths
              </h2>

              <p>
                What your resume is doing well.
              </p>

            </div>

          </div>


          <div className="analysis-list">

            {strengths.length > 0 ? (

              strengths.map(
                (item, index) => (

                  <div
                    className="analysis-list-item strength-item"
                    key={index}
                  >

                    <span>
                      ✓
                    </span>

                    <p>
                      {item}
                    </p>

                  </div>

                )
              )

            ) : (

              <div className="analysis-empty">
                No strengths detected yet.
              </div>

            )}

          </div>

        </section>


        {/* ===================================================
            WEAKNESSES
            =================================================== */}

        <section className="analysis-section">

          <div className="analysis-section-title">

            <div className="analysis-section-icon warning">
              !
            </div>

            <div>

              <h2>
                Areas to Improve
              </h2>

              <p>
                Important areas that may reduce your ATS score.
              </p>

            </div>

          </div>


          <div className="analysis-list">

            {weaknesses.length > 0 ? (

              weaknesses.map(
                (item, index) => (

                  <div
                    className="analysis-list-item weakness-item"
                    key={index}
                  >

                    <span>
                      !
                    </span>

                    <p>
                      {item}
                    </p>

                  </div>

                )
              )

            ) : (

              <div className="analysis-empty">
                No major weaknesses detected.
              </div>

            )}

          </div>

        </section>


        {/* ===================================================
            AI RECOMMENDATIONS
            =================================================== */}

        <section className="analysis-section">

          <div className="analysis-section-title">

            <div className="analysis-section-icon suggestion">
              💡
            </div>

            <div>

              <h2>
                AI Recommendations
              </h2>

              <p>
                Suggestions to improve your resume.
              </p>

            </div>

          </div>


          <div className="analysis-list">

            {suggestions.length > 0 ? (

              suggestions.map(
                (item, index) => (

                  <div
                    className="analysis-list-item suggestion-item"
                    key={index}
                  >

                    <span>
                      →
                    </span>

                    <p>
                      {item}
                    </p>

                  </div>

                )
              )

            ) : (

              <div className="analysis-empty">
                No suggestions available.
              </div>

            )}

          </div>

        </section>


        {/* ===================================================
            DETECTED SKILLS
            =================================================== */}

        <section className="analysis-section">

          <div className="analysis-section-title">

            <div className="analysis-section-icon">
              ⚡
            </div>

            <div>

              <h2>
                Detected Skills
              </h2>

              <p>
                Skills identified from your resume.
              </p>

            </div>

          </div>


          <div className="skills-container">

            {skills.length > 0 ? (

              skills.map(
                (skill, index) => (

                  <span
                    className="skill-tag"
                    key={index}
                  >
                    {skill}
                  </span>

                )
              )

            ) : (

              <div className="analysis-empty">
                No skills detected.
              </div>

            )}

          </div>

        </section>


        {/* ===================================================
            EDUCATION
            =================================================== */}

        {education.length > 0 && (

          <section className="analysis-section">

            <div className="analysis-section-title">

              <div className="analysis-section-icon">
                🎓
              </div>

              <div>

                <h2>
                  Education
                </h2>

                <p>
                  Education information detected from your resume.
                </p>

              </div>

            </div>


            <div className="analysis-education-list">

              {education.map(
                (item, index) => (

                  <div
                    className="analysis-education-card"
                    key={
                      item?._id ||
                      item?.id ||
                      index
                    }
                  >

                    <h3>
                      {item?.degree ||
                        item?.qualification ||
                        "Degree"}
                    </h3>

                    <p>
                      {item?.institution ||
                        item?.college ||
                        item?.university ||
                        "Institution"}
                    </p>

                    <span>

                      {item?.startYear &&
                      item?.endYear
                        ? `${item.startYear} - ${item.endYear}`
                        : item?.year
                        ? item.year
                        : "Duration not available"}

                    </span>

                  </div>

                )
              )}

            </div>

          </section>

        )}


        {/* ===================================================
            PERSONAL INFORMATION
            =================================================== */}

        <section className="analysis-section">

          <div className="analysis-section-title">

            <div className="analysis-section-icon">
              👤
            </div>

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Contact details detected from your resume.
              </p>

            </div>

          </div>


          <div className="analysis-personal-grid">

            <div>

              <span>
                Name
              </span>

              <strong>
                {resume?.personalInfo?.name ||
                  resume?.name ||
                  "Not available"}
              </strong>

            </div>


            <div>

              <span>
                Email
              </span>

              <strong>
                {resume?.personalInfo?.email ||
                  resume?.email ||
                  "Not available"}
              </strong>

            </div>


            <div>

              <span>
                Phone
              </span>

              <strong>
                {resume?.personalInfo?.phone ||
                  resume?.phone ||
                  "Not available"}
              </strong>

            </div>


            <div>

              <span>
                Location
              </span>

              <strong>
                {resume?.personalInfo?.location ||
                  resume?.location ||
                  "Not available"}
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================================
            ACTIONS
            =================================================== */}

        <section className="analysis-actions">

          <button
            className="analysis-primary-btn"
            onClick={() =>
              navigate("/upload-resume")
            }
          >
            Analyze Another Resume

            <span>
              →
            </span>

          </button>


          <button
            className="analysis-secondary-btn"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Back to Dashboard
          </button>

        </section>

      </main>

    </div>
  );
}

export default Analysis;  