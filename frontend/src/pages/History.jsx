import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getResumes,
  deleteResume,
  saveLatestResumeId,
  downloadResumePDF,
} from "../services/resumeService";

import {
  getInterviews,
  deleteInterview,
} from "../services/interviewService";

function History() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingResumeId, setDeletingResumeId] =
    useState(null);

  const [deletingInterviewId, setDeletingInterviewId] =
    useState(null);

  const [downloadingResumeId, setDownloadingResumeId] =
    useState(null);

  // =========================================================
  // LOAD HISTORY
  // =========================================================

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const [resumeData, interviewData] =
        await Promise.all([
          getResumes(),
          getInterviews(),
        ]);

      console.log(
        "Resume history:",
        resumeData
      );

      console.log(
        "Interview history:",
        interviewData
      );

      setResumes(
        Array.isArray(resumeData?.resumes)
          ? resumeData.resumes
          : []
      );

      setInterviews(
        Array.isArray(
          interviewData?.interviews
        )
          ? interviewData.interviews
          : []
      );
    } catch (err) {
      console.error(
        "History loading error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load history."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // =========================================================
  // VIEW RESUME ANALYSIS
  // =========================================================

  const handleViewAnalysis = (resumeId) => {
    if (!resumeId) {
      return;
    }

    saveLatestResumeId(resumeId);

    navigate("/analysis");
  };

  // =========================================================
  // DOWNLOAD RESUME PDF
  // =========================================================

  const handleDownloadPDF = async (
    resumeId
  ) => {
    if (!resumeId) {
      return;
    }

    try {
      setDownloadingResumeId(resumeId);
      setError("");

      await downloadResumePDF(
        resumeId
      );
    } catch (err) {
      console.error(
        "PDF download error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to download resume PDF."
      );
    } finally {
      setDownloadingResumeId(null);
    }
  };

  // =========================================================
  // DELETE RESUME
  // =========================================================

  const handleDeleteResume = async (
    resumeId
  ) => {
    if (!resumeId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingResumeId(resumeId);
      setError("");

      await deleteResume(resumeId);

      setResumes((previous) =>
        previous.filter(
          (resume) =>
            resume._id !== resumeId
        )
      );

      const latestId =
        localStorage.getItem(
          "latestResumeId"
        );

      if (latestId === resumeId) {
        localStorage.removeItem(
          "latestResumeId"
        );
      }
    } catch (err) {
      console.error(
        "Delete resume error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to delete resume."
      );
    } finally {
      setDeletingResumeId(null);
    }
  };

  // =========================================================
  // DELETE INTERVIEW
  // =========================================================

  const handleDeleteInterview = async (
    interviewId
  ) => {
    if (!interviewId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingInterviewId(
        interviewId
      );

      setError("");

      await deleteInterview(
        interviewId
      );

      setInterviews((previous) =>
        previous.filter(
          (interview) =>
            interview._id !==
            interviewId
        )
      );

      const savedInterviewId =
        localStorage.getItem(
          "currentInterviewId"
        );

      if (
        savedInterviewId ===
        interviewId
      ) {
        localStorage.removeItem(
          "currentInterviewId"
        );
      }

      sessionStorage.removeItem(
        "interviewResult"
      );
    } catch (err) {
      console.error(
        "Delete interview error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to delete interview."
      );
    } finally {
      setDeletingInterviewId(null);
    }
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
  // DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatDateTime = (
    date
  ) => {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(
      date
    ).toLocaleString(
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
  // ATS SCORE
  // =========================================================

  const getScoreClass = (
    score
  ) => {
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

  const getScoreLabel = (
    score
  ) => {
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
  // INTERVIEW SCORE
  // =========================================================

  const getInterviewScoreClass = (
    score
  ) => {
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

  const getInterviewScoreLabel = (
    score
  ) => {
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
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="history-page">

        <nav className="history-navbar">

          <Link
            to="/"
            className="dashboard-logo"
          >
            Resume<span>IQ</span>
          </Link>

          <div className="history-nav-links">

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link
              to="/history"
              className="active"
            >
              History
            </Link>

            <Link to="/profile">
              Profile
            </Link>

          </div>

        </nav>

        <main className="history-container">

          <div className="history-loading">

            <div className="history-loader"></div>

            <h2>
              Loading Your History...
            </h2>

            <p>
              Fetching your resumes and
              interviews.
            </p>

          </div>

        </main>

      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="history-page">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="history-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="history-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link
            to="/history"
            className="active"
          >
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="history-container">

        {/* ===================================================
            HEADER
            =================================================== */}

        <section className="history-header">

          <span className="history-badge">
            Career Activity
          </span>

          <h1>
            Your History
          </h1>

          <p>
            Manage your resume analyses and
            review your interview practice.
          </p>

        </section>


        {/* ===================================================
            ERROR
            =================================================== */}

        {error && (
          <div className="history-error">
            ⚠️ {error}
          </div>
        )}


        {/* ===================================================
            RESUME HISTORY
            =================================================== */}

        <section className="history-section">

          <div className="history-section-heading">

            <div>

              <h2>
                Resume Analysis
              </h2>

              <p>
                Your previously uploaded and
                analyzed resumes.
              </p>

            </div>

            <Link
              to="/upload-resume"
              className="history-small-btn"
            >
              + Analyze Resume
            </Link>

          </div>


          {resumes.length === 0 ? (

            <div className="history-empty">

              <div className="history-empty-icon">
                📄
              </div>

              <h2>
                No Resumes Yet
              </h2>

              <p>
                Upload your first resume to
                get an AI-powered ATS analysis.
              </p>

              <Link
                to="/upload-resume"
                className="history-primary-btn"
              >
                Upload Resume
                <span>→</span>
              </Link>

            </div>

          ) : (

            <section className="history-list">

              {resumes.map((resume) => {

                const rawScore =
                  resume?.atsScore;

                const hasScore =
                  rawScore !== null &&
                  rawScore !== undefined;

                const score = hasScore
                  ? Number(rawScore)
                  : null;

                const scoreClass =
                  score !== null
                    ? getScoreClass(score)
                    : "";

                const scoreLabel =
                  score !== null
                    ? getScoreLabel(score)
                    : "Not analyzed";

                const skillsCount =
                  Array.isArray(
                    resume?.skills
                  )
                    ? resume.skills.length
                    : 0;

                const projectsCount =
                  Array.isArray(
                    resume?.projects
                  )
                    ? resume.projects.length
                    : 0;

                const originalFile =
                  resume?.file
                    ?.originalName ||
                  "Resume file";

                return (
                  <article
                    className="history-card"
                    key={resume._id}
                  >

                    {/* FILE */}

                    <div className="history-file">

                      <div className="history-file-icon">
                        📄
                      </div>

                      <div>

                        <h2>
                          {resume?.title ||
                            "Untitled Resume"}
                        </h2>

                        <p>
                          {originalFile}
                        </p>

                        <span>
                          Analyzed on{" "}
                          {formatDate(
                            resume?.createdAt
                          )}
                        </span>

                      </div>

                    </div>


                    {/* SCORE */}

                    <div
                      className={`history-score ${scoreClass}`}
                    >

                      <strong>
                        {score !== null
                          ? score
                          : "--"}
                      </strong>

                      {score !== null && (
                        <span>
                          /100
                        </span>
                      )}

                      <small>
                        {scoreLabel}
                      </small>

                    </div>


                    {/* STATS */}

                    <div className="history-stats">

                      <div>

                        <span>
                          Skills
                        </span>

                        <strong>
                          {skillsCount}
                        </strong>

                      </div>

                      <div>

                        <span>
                          Projects
                        </span>

                        <strong>
                          {projectsCount}
                        </strong>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="history-actions">

                      <button
                        type="button"
                        className="history-view-btn"
                        onClick={() =>
                          handleViewAnalysis(
                            resume._id
                          )
                        }
                      >
                        View Analysis
                        <span>→</span>
                      </button>


                      <button
                        type="button"
                        className="history-download-btn"
                        disabled={
                          downloadingResumeId ===
                          resume._id
                        }
                        onClick={() =>
                          handleDownloadPDF(
                            resume._id
                          )
                        }
                      >
                        {downloadingResumeId ===
                        resume._id
                          ? "Downloading..."
                          : "↓ PDF"}
                      </button>


                      <button
                        type="button"
                        className="history-delete-btn"
                        disabled={
                          deletingResumeId ===
                          resume._id
                        }
                        onClick={() =>
                          handleDeleteResume(
                            resume._id
                          )
                        }
                      >
                        {deletingResumeId ===
                        resume._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </article>
                );
              })}

            </section>

          )}

        </section>


        {/* ===================================================
            INTERVIEW HISTORY
            =================================================== */}

        <section className="history-section">

          <div className="history-section-heading">

            <div>

              <h2>
                Interview Practice
              </h2>

              <p>
                Review your previous AI interview
                practice sessions.
              </p>

            </div>

            <Link
              to="/interview"
              className="history-small-btn"
            >
              + Practice Interview
            </Link>

          </div>


          {interviews.length === 0 ? (

            <div className="history-empty history-interview-empty">

              <div className="history-empty-icon">
                💬
              </div>

              <h2>
                No Interviews Yet
              </h2>

              <p>
                Start an AI-powered mock interview
                to practice your skills.
              </p>

              <Link
                to="/interview"
                className="history-primary-btn"
              >
                Start Interview
                <span>→</span>
              </Link>

            </div>

          ) : (

            <section className="interview-history-list">

              {interviews.map(
                (interview) => {

                  const rawScore =
                    interview?.totalScore;

                  const isCompleted =
                    interview?.status ===
                    "completed";

                  const hasScore =
                    rawScore !== null &&
                    rawScore !== undefined;

                  const score =
                    hasScore
                      ? Number(rawScore)
                      : null;

                  const questionCount =
                    Array.isArray(
                      interview?.questions
                    )
                      ? interview.questions.length
                      : 0;

                  const scoreClass =
                    score !== null
                      ? getInterviewScoreClass(
                          score
                        )
                      : "";

                  const scoreLabel =
                    score !== null
                      ? getInterviewScoreLabel(
                          score
                        )
                      : "Not completed";

                  return (
                    <article
                      className="interview-history-card"
                      key={interview._id}
                    >

                      {/* ICON */}

                      <div className="interview-history-icon">
                        💬
                      </div>


                      {/* DETAILS */}

                      <div className="interview-history-details">

                        <span className="interview-history-status">
                          {isCompleted
                            ? "Completed"
                            : "In Progress"}
                        </span>

                        <h3>
                          {interview.jobRole ||
                            "Mock Interview"}
                        </h3>

                        <p>
                          {interview.difficulty ||
                            "Medium"}
                          {" • "}
                          {questionCount}
                          {" Questions"}
                        </p>

                        <small>
                          {formatDateTime(
                            interview.createdAt
                          )}
                        </small>

                      </div>


                      {/* SCORE */}

                      <div
                        className={`interview-history-score ${scoreClass}`}
                      >

                        <strong>
                          {isCompleted &&
                          score !== null
                            ? score
                            : "--"}
                        </strong>

                        {isCompleted &&
                          score !== null && (
                            <span>
                              /100
                            </span>
                          )}

                        <small>
                          {scoreLabel}
                        </small>

                      </div>


                      {/* ACTIONS */}

                      <div className="interview-history-actions">

                        {isCompleted && (
                          <button
                            type="button"
                            className="history-view-btn"
                            onClick={() =>
                              handleViewInterview(
                                interview
                              )
                            }
                          >
                            View Result
                            <span>→</span>
                          </button>
                        )}


                        <button
                          type="button"
                          className="history-delete-btn"
                          disabled={
                            deletingInterviewId ===
                            interview._id
                          }
                          onClick={() =>
                            handleDeleteInterview(
                              interview._id
                            )
                          }
                        >
                          {deletingInterviewId ===
                          interview._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </div>

                    </article>
                  );
                }
              )}

            </section>

          )}

        </section>


        {/* ===================================================
            SUMMARY
            =================================================== */}

        <section className="history-summary">

          <div>

            <span>
              📄
            </span>

            <strong>
              {resumes.length}
            </strong>

            <small>
              Resume
              {resumes.length !== 1
                ? "s"
                : ""}
            </small>

          </div>


          <div>

            <span>
              💬
            </span>

            <strong>
              {interviews.length}
            </strong>

            <small>
              Interview
              {interviews.length !== 1
                ? "s"
                : ""}
            </small>

          </div>


          <div>

            <span>
              🏆
            </span>

            <strong>
              {
                interviews.filter(
                  (item) =>
                    item.status ===
                    "completed"
                ).length
              }
            </strong>

            <small>
              Completed
            </small>

          </div>

        </section>

      </main>

    </div>
  );
}

export default History;