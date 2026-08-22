import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  getResumes,
  saveLatestResumeId,
} from "../services/resumeService";

import {
  getInterviews,
} from "../services/interviewService";

function Dashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD DASHBOARD DATA
  // =========================================================

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [resumeData, interviewData] =
        await Promise.all([
          getResumes(),
          getInterviews(),
        ]);

      console.log(
        "Dashboard resumes:",
        resumeData
      );

      console.log(
        "Dashboard interviews:",
        interviewData
      );

      const resumeList =
        Array.isArray(resumeData?.resumes)
          ? resumeData.resumes
          : [];

      const interviewList =
        Array.isArray(
          interviewData?.interviews
        )
          ? interviewData.interviews
          : [];

      setResumes(resumeList);
      setInterviews(interviewList);

      // Save latest resume automatically
      if (
        resumeList.length > 0 &&
        resumeList[0]?._id
      ) {
        saveLatestResumeId(
          resumeList[0]._id
        );
      }

    } catch (err) {
      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load your dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // =========================================================
  // LATEST RESUME
  // =========================================================

  const latestResume =
    resumes.length > 0
      ? resumes[0]
      : null;

  // =========================================================
  // LATEST INTERVIEW
  // =========================================================

  const latestInterview =
    interviews.length > 0
      ? interviews[0]
      : null;

  // =========================================================
  // LATEST ATS SCORE
  // =========================================================

  const latestScore =
    latestResume?.atsScore !== null &&
    latestResume?.atsScore !== undefined
      ? Number(
          latestResume.atsScore
        )
      : null;

  // =========================================================
  // BEST ATS SCORE
  // =========================================================

  const bestATSScore =
    resumes.length > 0
      ? Math.max(
          ...resumes
            .map((resume) =>
              resume?.atsScore !== null &&
              resume?.atsScore !== undefined
                ? Number(
                    resume.atsScore
                  )
                : 0
            )
        )
      : null;

  // =========================================================
  // LATEST INTERVIEW SCORE
  // =========================================================

  const latestInterviewScore =
    latestInterview?.totalScore !== null &&
    latestInterview?.totalScore !== undefined
      ? Number(
          latestInterview.totalScore
        )
      : null;

  // =========================================================
  // COMPLETED INTERVIEWS
  // =========================================================

  const completedInterviews =
    interviews.filter(
      (interview) =>
        interview?.status ===
        "completed"
    );

  // =========================================================
  // VIEW ANALYSIS
  // =========================================================

  const handleViewAnalysis = (
    resumeId
  ) => {
    if (!resumeId) {
      return;
    }

    saveLatestResumeId(
      resumeId
    );

    navigate("/analysis");
  };

  // =========================================================
  // VIEW INTERVIEW RESULT
  // =========================================================

  const handleViewInterview = (
    interview
  ) => {
    if (!interview?._id) {
      return;
    }

    sessionStorage.setItem(
      "interviewResult",
      JSON.stringify(interview)
    );

    localStorage.setItem(
      "currentInterviewId",
      interview._id
    );

    navigate(
      "/interview/result"
    );
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  // =========================================================
  // USER NAME
  // =========================================================

  const displayName =
    user?.name ||
    latestResume?.personalInfo?.name ||
    "there";

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FORMAT DATE + TIME
  // =========================================================

  const formatDateTime = (
    date
  ) => {
    if (!date) {
      return "";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // =========================================================
  // ATS SCORE LABEL
  // =========================================================

  const getScoreLabel = (
    score
  ) => {
    if (score === null) {
      return "Not analyzed";
    }

    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 50) {
      return "Needs Improvement";
    }

    return "Weak";
  };

  // =========================================================
  // ATS SCORE CLASS
  // =========================================================

  const getScoreClass = (
    score
  ) => {
    if (score === null) {
      return "";
    }

    if (score >= 85) {
      return "excellent";
    }

    if (score >= 70) {
      return "good";
    }

    if (score >= 50) {
      return "average";
    }

    return "weak";
  };

  // =========================================================
  // INTERVIEW SCORE LABEL
  // =========================================================

  const getInterviewScoreLabel = (
    score
  ) => {
    if (score === null) {
      return "Not completed";
    }

    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Good";
    }

    if (score >= 50) {
      return "Needs Improvement";
    }

    return "Needs Practice";
  };

  // =========================================================
  // INTERVIEW SCORE CLASS
  // =========================================================

  const getInterviewScoreClass = (
    score
  ) => {
    if (score === null) {
      return "";
    }

    if (score >= 85) {
      return "excellent";
    }

    if (score >= 70) {
      return "good";
    }

    if (score >= 50) {
      return "average";
    }

    return "weak";
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="dashboard-page">

        <nav className="dashboard-navbar">

          <Link
            to="/"
            className="dashboard-logo"
          >
            Resume<span>IQ</span>
          </Link>

          <div className="dashboard-nav-links">

            <Link to="/">
              Home
            </Link>

            <Link
              to="/dashboard"
              className="active"
            >
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

        <main className="dashboard-container">

          <div className="dashboard-loading">

            <div className="dashboard-loader">
              ⏳
            </div>

            <h2>
              Loading your dashboard...
            </h2>

            <p>
              Fetching your resumes and
              interview activity.
            </p>

          </div>

        </main>

      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="dashboard-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="dashboard-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="dashboard-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link
            to="/dashboard"
            className="active"
          >
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

          <button
            type="button"
            className="logout-link"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="dashboard-container">

        {/* ===================================================
            WELCOME
        =================================================== */}

        <section className="dashboard-welcome">

          <div>

            <p className="dashboard-badge">
              AI Career Assistant
            </p>

            <h1>
              Welcome back 👋

              {displayName !==
                "there" && (
                <>
                  ,{" "}
                  <span className="dashboard-user-name">
                    {displayName}
                  </span>
                </>
              )}
            </h1>

            <p>
              Improve your resume and
              prepare for your next
              career opportunity.
            </p>

          </div>

        </section>


        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="dashboard-error">

            <span>
              ⚠️
            </span>

            <div>
              {error}
            </div>

          </div>
        )}


        {/* ===================================================
            STATISTICS
        =================================================== */}

        <section className="dashboard-stats">

          {/* ATS */}

          <div className="stat-card">

            <div className="stat-icon purple">
              📊
            </div>

            <div>

              <span>
                ATS Score
              </span>

              <strong>
                {latestScore !== null
                  ? latestScore
                  : "--"}
              </strong>

            </div>

          </div>


          {/* RESUMES */}

          <div className="stat-card">

            <div className="stat-icon blue">
              📄
            </div>

            <div>

              <span>
                Resumes
              </span>

              <strong>
                {resumes.length}
              </strong>

            </div>

          </div>


          {/* INTERVIEWS */}

          <div className="stat-card">

            <div className="stat-icon pink">
              💬
            </div>

            <div>

              <span>
                Interviews
              </span>

              <strong>
                {interviews.length}
              </strong>

            </div>

          </div>


          {/* BEST SCORE */}

          <div className="stat-card">

            <div className="stat-icon green">
              🏆
            </div>

            <div>

              <span>
                Best ATS
              </span>

              <strong>
                {bestATSScore !== null &&
                bestATSScore > 0
                  ? bestATSScore
                  : "--"}
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================================
            UPLOAD RESUME
        =================================================== */}

        <section className="upload-dashboard-card">

          <div className="upload-dashboard-icon">
            📄
          </div>

          <h2>
            Upload Your Resume
          </h2>

          <p>
            Upload your latest resume
            and let ResumeIQ analyze it
            using AI.
          </p>

          <span className="upload-format">
            PDF or DOCX • Maximum 10 MB
          </span>

          <Link
            to="/upload-resume"
            className="dashboard-upload-btn"
          >
            Upload Resume
            <span>
              →
            </span>
          </Link>

        </section>


        {/* ===================================================
            QUICK ACTIONS
        =================================================== */}

        <section className="quick-actions">

          <h2>
            Quick Actions
          </h2>

          <div className="quick-action-grid">

            {/* ANALYZE */}

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
                  Check your ATS score
                  and resume quality.
                </p>

              </section>

              <span>
                →
              </span>

            </Link>


            {/* BUILDER */}

            <Link
              to="/resume-builder"
              className="quick-action-card"
            >

              <div>
                ✨
              </div>

              <section>

                <h3>
                  Resume Builder
                </h3>

                <p>
                  Build and customize
                  your professional resume.
                </p>

              </section>

              <span>
                →
              </span>

            </Link>


            {/* INTERVIEW */}

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
                  Generate AI-powered
                  interview questions.
                </p>

              </section>

              <span>
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ===================================================
            RECENT ANALYSIS
        =================================================== */}

        <section className="recent-analysis">

          <div className="section-heading">

            <div>

              <h2>
                Recent Analysis
              </h2>

              <p>
                Your latest resume
                analysis results.
              </p>

            </div>

            {resumes.length > 0 && (
              <Link to="/history">
                View History →
              </Link>
            )}

          </div>


          {latestResume ? (

            <div className="dashboard-recent-card">

              {/* FILE */}

              <div className="dashboard-recent-file">

                <div className="dashboard-recent-icon">
                  📄
                </div>

                <div>

                  <h3>
                    {latestResume.title ||
                      "Untitled Resume"}
                  </h3>

                  <p>
                    {latestResume
                      ?.file
                      ?.originalName ||
                      "Resume file"}
                  </p>

                  <span>
                    Analyzed on{" "}
                    {formatDate(
                      latestResume.createdAt
                    )}
                  </span>

                </div>

              </div>


              {/* SCORE */}

              <div
                className={`dashboard-recent-score ${getScoreClass(
                  latestScore
                )}`}
              >

                <strong>
                  {latestScore !== null
                    ? latestScore
                    : "--"}
                </strong>

                {latestScore !== null && (
                  <span>
                    /100
                  </span>
                )}

                <small>
                  {getScoreLabel(
                    latestScore
                  )}
                </small>

              </div>


              {/* DETAILS */}

              <div className="dashboard-recent-details">

                <div>

                  <span>
                    Skills
                  </span>

                  <strong>
                    {Array.isArray(
                      latestResume.skills
                    )
                      ? latestResume.skills
                          .length
                      : 0}
                  </strong>

                </div>

                <div>

                  <span>
                    Projects
                  </span>

                  <strong>
                    {Array.isArray(
                      latestResume.projects
                    )
                      ? latestResume
                          .projects
                          .length
                      : 0}
                  </strong>

                </div>

              </div>


              {/* BUTTON */}

              <button
                type="button"
                className="dashboard-analysis-btn"
                onClick={() =>
                  handleViewAnalysis(
                    latestResume._id
                  )
                }
              >
                View Analysis

                <span>
                  →
                </span>

              </button>

            </div>

          ) : (

            <div className="empty-analysis">

              <div>
                📄
              </div>

              <h3>
                No analysis yet
              </h3>

              <p>
                Upload your resume to
                get your first
                AI-powered analysis.
              </p>

              <Link
                to="/upload-resume"
                className="dashboard-upload-btn"
              >
                Upload Resume

                <span>
                  →
                </span>

              </Link>

            </div>

          )}

        </section>


        {/* ===================================================
            RECENT INTERVIEW
        =================================================== */}

        <section className="recent-analysis">

          <div className="section-heading">

            <div>

              <h2>
                Recent Interview
              </h2>

              <p>
                Your latest interview
                practice result.
              </p>

            </div>

            {interviews.length > 0 && (
              <Link to="/history">
                View History →
              </Link>
            )}

          </div>


          {latestInterview ? (

            <div className="dashboard-recent-card">

              {/* INTERVIEW */}

              <div className="dashboard-recent-file">

                <div className="dashboard-recent-icon">
                  💬
                </div>

                <div>

                  <h3>
                    {latestInterview
                      .jobRole ||
                      "Mock Interview"}
                  </h3>

                  <p>
                    {latestInterview
                      .difficulty ||
                      "Medium"}

                    {" • "}

                    {Array.isArray(
                      latestInterview
                        .questions
                    )
                      ? latestInterview
                          .questions
                          .length
                      : 0}

                    {" Questions"}
                  </p>

                  <span>
                    {formatDateTime(
                      latestInterview.createdAt
                    )}
                  </span>

                </div>

              </div>


              {/* SCORE */}

              <div
                className={`dashboard-recent-score ${getInterviewScoreClass(
                  latestInterviewScore
                )}`}
              >

                <strong>
                  {latestInterview
                    .status ===
                    "completed"
                    ? latestInterviewScore
                    : "--"}
                </strong>

                {latestInterview
                  .status ===
                  "completed" &&
                  latestInterviewScore !==
                    null && (
                    <span>
                      /100
                    </span>
                  )}

                <small>
                  {latestInterview
                    .status ===
                  "completed"
                    ? getInterviewScoreLabel(
                        latestInterviewScore
                      )
                    : "Not completed"}
                </small>

              </div>


              {/* DETAILS */}

              <div className="dashboard-recent-details">

                <div>

                  <span>
                    Status
                  </span>

                  <strong>
                    {latestInterview
                      .status ===
                    "completed"
                      ? "Done"
                      : "Active"}
                  </strong>

                </div>

                <div>

                  <span>
                    Completed
                  </span>

                  <strong>
                    {
                      completedInterviews.length
                    }
                  </strong>

                </div>

              </div>


              {/* BUTTON */}

              {latestInterview
                .status ===
              "completed" ? (

                <button
                  type="button"
                  className="dashboard-analysis-btn"
                  onClick={() =>
                    handleViewInterview(
                      latestInterview
                    )
                  }
                >
                  View Result

                  <span>
                    →
                  </span>

                </button>

              ) : (

                <Link
                  to="/interview"
                  className="dashboard-analysis-btn"
                >
                  Continue Interview

                  <span>
                    →
                  </span>

                </Link>

              )}

            </div>

          ) : (

            <div className="empty-analysis">

              <div>
                💬
              </div>

              <h3>
                No interview yet
              </h3>

              <p>
                Start an AI-powered
                mock interview to
                practice your skills.
              </p>

              <Link
                to="/interview"
                className="dashboard-upload-btn"
              >
                Start Interview

                <span>
                  →
                </span>

              </Link>

            </div>

          )}

        </section>


        {/* ===================================================
            CAREER SUMMARY
        =================================================== */}

        <section className="dashboard-career-summary">

          <div>

            <span>
              🎯
            </span>

            <div>

              <h3>
                Keep improving your career profile
              </h3>

              <p>
                Analyze your resume, build a stronger
                profile and practice interviews regularly.
              </p>

            </div>

          </div>

          <Link
            to="/profile"
            className="dashboard-summary-btn"
          >
            View Profile
            <span>
              →
            </span>
          </Link>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;