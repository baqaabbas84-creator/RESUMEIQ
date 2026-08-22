import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getResumes } from "../services/resumeService";
import { getInterviews } from "../services/interviewService";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD PROFILE DATA
  // =========================================================

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError("");

      // Load saved user
      try {
        const savedUser =
          localStorage.getItem("user");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error(
          "User parsing error:",
          err
        );
      }

      // Load resumes and interviews
      const [
        resumeData,
        interviewData,
      ] = await Promise.all([
        getResumes(),
        getInterviews(),
      ]);

      const resumeList =
        Array.isArray(
          resumeData?.resumes
        )
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

    } catch (err) {
      console.error(
        "Profile loading error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load profile data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  // =========================================================
  // LATEST RESUME
  // =========================================================

  const latestResume =
    resumes.length > 0
      ? resumes[0]
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
  // COMPLETED INTERVIEWS
  // =========================================================

  const completedInterviews =
    interviews.filter(
      (interview) =>
        interview.status ===
        "completed"
    );

  // =========================================================
  // AVERAGE INTERVIEW SCORE
  // =========================================================

  const averageInterviewScore =
    completedInterviews.length > 0
      ? Math.round(
          completedInterviews.reduce(
            (total, interview) =>
              total +
              Number(
                interview.totalScore || 0
              ),
            0
          ) /
            completedInterviews.length
        )
      : null;

  // =========================================================
  // DISPLAY NAME
  // =========================================================

  const displayName =
    user?.name ||
    latestResume?.personalInfo?.name ||
    "User";

  // =========================================================
  // EMAIL
  // =========================================================

  const email =
    user?.email ||
    latestResume?.personalInfo?.email ||
    "No email available";

  // =========================================================
  // MEMBER SINCE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "latestResumeId"
    );

    localStorage.removeItem(
      "currentInterviewId"
    );

    sessionStorage.removeItem(
      "interviewResult"
    );

    navigate("/login");
  };

  // =========================================================
  // SCORE LABEL
  // =========================================================

  const getScoreLabel = (score) => {
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
  // SCORE CLASS
  // =========================================================

  const getScoreClass = (score) => {
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
  // PROFILE INITIAL
  // =========================================================

  const profileInitial =
    displayName
      .charAt(0)
      .toUpperCase();

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="profile-page">

      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="profile-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="profile-nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link
            to="/profile"
            className="active"
          >
            Profile
          </Link>

        </div>

      </nav>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="profile-container">

        {/* ===================================================
            HEADER
            =================================================== */}

        <section className="profile-header">

          <span className="profile-badge">
            Account
          </span>

          <h1>
            Your Profile
          </h1>

          <p>
            Manage your ResumeIQ account and
            track your career progress.
          </p>

        </section>


        {/* ===================================================
            ERROR
            =================================================== */}

        {error && (
          <div className="profile-error">
            ⚠️ {error}
          </div>
        )}


        {/* ===================================================
            PROFILE CARD
            =================================================== */}

        <section className="profile-main-card">

          <div className="profile-avatar">
            {loading
              ? "..."
              : profileInitial}
          </div>

          <div className="profile-user-info">

            <h2>
              {loading
                ? "Loading..."
                : displayName}
            </h2>

            <p>
              {loading
                ? "Loading email..."
                : email}
            </p>

            <span className="profile-role">
              ResumeIQ User
            </span>

          </div>

          <div className="profile-account-status">

            <span className="status-dot"></span>

            Active Account

          </div>

        </section>


        {/* ===================================================
            STATISTICS
            =================================================== */}

        <section className="profile-stats">

          {/* RESUMES */}

          <div className="profile-stat-card">

            <div className="profile-stat-icon purple">
              📄
            </div>

            <div>

              <span>
                Resumes
              </span>

              <strong>
                {loading
                  ? "..."
                  : resumes.length}
              </strong>

              <small>
                Uploaded
              </small>

            </div>

          </div>


          {/* INTERVIEWS */}

          <div className="profile-stat-card">

            <div className="profile-stat-icon blue">
              💬
            </div>

            <div>

              <span>
                Interviews
              </span>

              <strong>
                {loading
                  ? "..."
                  : interviews.length}
              </strong>

              <small>
                Practice sessions
              </small>

            </div>

          </div>


          {/* COMPLETED */}

          <div className="profile-stat-card">

            <div className="profile-stat-icon green">
              ✓
            </div>

            <div>

              <span>
                Completed
              </span>

              <strong>
                {loading
                  ? "..."
                  : completedInterviews.length}
              </strong>

              <small>
                Interviews
              </small>

            </div>

          </div>


          {/* ATS */}

          <div className="profile-stat-card">

            <div className="profile-stat-icon orange">
              📊
            </div>

            <div>

              <span>
                ATS Score
              </span>

              <strong>
                {loading
                  ? "..."
                  : latestScore !== null
                  ? latestScore
                  : "--"}
              </strong>

              <small>
                {getScoreLabel(
                  latestScore
                )}
              </small>

            </div>

          </div>

        </section>


        {/* ===================================================
            ACCOUNT INFORMATION
            =================================================== */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <h2>
                Account Information
              </h2>

              <p>
                Your basic ResumeIQ account details.
              </p>

            </div>

          </div>


          <div className="profile-information-card">

            <div className="profile-info-row">

              <div className="profile-info-icon">
                👤
              </div>

              <div>

                <span>
                  Full Name
                </span>

                <strong>
                  {displayName}
                </strong>

              </div>

            </div>


            <div className="profile-info-row">

              <div className="profile-info-icon">
                ✉️
              </div>

              <div>

                <span>
                  Email Address
                </span>

                <strong>
                  {email}
                </strong>

              </div>

            </div>


            <div className="profile-info-row">

              <div className="profile-info-icon">
                📅
              </div>

              <div>

                <span>
                  Latest Resume
                </span>

                <strong>
                  {latestResume
                    ? formatDate(
                        latestResume.createdAt
                      )
                    : "No resume uploaded"}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            CAREER PROGRESS
            =================================================== */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <h2>
                Career Progress
              </h2>

              <p>
                A quick overview of your current progress.
              </p>

            </div>

          </div>


          <div className="profile-progress-grid">

            {/* ATS */}

            <div className="profile-progress-card">

              <div className="progress-card-top">

                <div>

                  <span>
                    Latest ATS Score
                  </span>

                  <strong>
                    {latestScore !== null
                      ? `${latestScore}/100`
                      : "--"}
                  </strong>

                </div>

                <div className="progress-icon">
                  📊
                </div>

              </div>


              <div className="progress-bar">

                <div
                  className={`progress-fill ${getScoreClass(
                    latestScore
                  )}`}
                  style={{
                    width:
                      latestScore !== null
                        ? `${Math.min(
                            latestScore,
                            100
                          )}%`
                        : "0%",
                  }}
                ></div>

              </div>


              <p>
                {latestScore !== null
                  ? getScoreLabel(
                      latestScore
                    )
                  : "Upload a resume to get your ATS score."}
              </p>

            </div>


            {/* INTERVIEW */}

            <div className="profile-progress-card">

              <div className="progress-card-top">

                <div>

                  <span>
                    Interview Performance
                  </span>

                  <strong>
                    {averageInterviewScore !==
                    null
                      ? `${averageInterviewScore}/100`
                      : "--"}
                  </strong>

                </div>

                <div className="progress-icon">
                  💬
                </div>

              </div>


              <div className="progress-bar">

                <div
                  className={`progress-fill ${getScoreClass(
                    averageInterviewScore
                  )}`}
                  style={{
                    width:
                      averageInterviewScore !==
                      null
                        ? `${Math.min(
                            averageInterviewScore,
                            100
                          )}%`
                        : "0%",
                  }}
                ></div>

              </div>


              <p>
                {averageInterviewScore !==
                null
                  ? `Average score across ${completedInterviews.length} completed interview${completedInterviews.length !== 1 ? "s" : ""}.`
                  : "Complete an interview to see your performance."}
              </p>

            </div>

          </div>

        </section>


        {/* ===================================================
            QUICK ACTIONS
            =================================================== */}

        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Continue improving your career profile.
              </p>

            </div>

          </div>


          <div className="profile-actions-grid">

            <Link
              to="/upload-resume"
              className="profile-action-card"
            >

              <div className="profile-action-icon">
                📄
              </div>

              <div>

                <h3>
                  Analyze Resume
                </h3>

                <p>
                  Check your latest ATS score
                  and resume quality.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/interview"
              className="profile-action-card"
            >

              <div className="profile-action-icon">
                💬
              </div>

              <div>

                <h3>
                  Practice Interview
                </h3>

                <p>
                  Practice with AI-generated
                  interview questions.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>


            <Link
              to="/history"
              className="profile-action-card"
            >

              <div className="profile-action-icon">
                🕘
              </div>

              <div>

                <h3>
                  View History
                </h3>

                <p>
                  Review your resumes and
                  interview results.
                </p>

              </div>

              <span>
                →
              </span>

            </Link>

          </div>

        </section>


        {/* ===================================================
            LOGOUT
            =================================================== */}

        <section className="profile-logout-section">

          <div>

            <h3>
              Sign out of ResumeIQ
            </h3>

            <p>
              You can sign back in anytime using
              your account credentials.
            </p>

          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="profile-logout-btn"
          >
            Logout
          </button>

        </section>

      </main>

    </div>
  );
}

export default Profile;