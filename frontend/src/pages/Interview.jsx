import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createInterview,
  submitInterview,
  saveInterviewId,
} from "../services/interviewService";

import {
  getLatestResume,
} from "../services/resumeService";

function Interview() {
  const navigate = useNavigate();

  // =========================================================
  // SETUP STATE
  // =========================================================

  const [jobRole, setJobRole] = useState("");
  const [difficulty, setDifficulty] =
    useState("Medium");

  // =========================================================
  // RESUME STATE
  // =========================================================

  const [resume, setResume] = useState(null);
  const [resumeLoading, setResumeLoading] =
    useState(true);

  // =========================================================
  // INTERVIEW STATE
  // =========================================================

  const [interview, setInterview] =
    useState(null);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] =
    useState([]);

  // =========================================================
  // UI STATE
  // =========================================================

  const [loading, setLoading] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================================================
  // OPTIONS
  // =========================================================

  const jobRoles = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "AI/ML Engineer",
  ];

  const difficulties = [
    "Easy",
    "Medium",
    "Hard",
  ];

  // =========================================================
  // LOAD LATEST RESUME
  // =========================================================

  useEffect(() => {
    const loadResume = async () => {
      try {
        setResumeLoading(true);

        const latestResume =
          await getLatestResume();

        setResume(latestResume);
      } catch (err) {
        console.error(
          "Failed to load latest resume:",
          err
        );

        setResume(null);
      } finally {
        setResumeLoading(false);
      }
    };

    loadResume();
  }, []);

  // =========================================================
  // START INTERVIEW
  // =========================================================

  const handleStartInterview = async (
    event
  ) => {
    event.preventDefault();

    if (!jobRole) {
      setError(
        "Please select a job role."
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      // -------------------------------------------------------
      // Resume ID
      // -------------------------------------------------------

      const resumeId =
        resume?._id || null;

      // -------------------------------------------------------
      // Create interview
      // -------------------------------------------------------

      const response =
        await createInterview({
          jobRole,
          difficulty,
          resumeId,
        });

      console.log(
        "Interview created:",
        response
      );

      const createdInterview =
        response?.interview;

      if (!createdInterview?._id) {
        throw new Error(
          "Interview ID was not returned by the server."
        );
      }

      if (
        !Array.isArray(
          createdInterview.questions
        ) ||
        createdInterview.questions.length === 0
      ) {
        throw new Error(
          "No interview questions were returned."
        );
      }

      // -------------------------------------------------------
      // Save interview
      // -------------------------------------------------------

      setInterview(
        createdInterview
      );

      saveInterviewId(
        createdInterview._id
      );

      // -------------------------------------------------------
      // Reset question
      // -------------------------------------------------------

      setCurrentQuestion(0);

      // -------------------------------------------------------
      // Create empty answers
      // -------------------------------------------------------

      setAnswers(
        new Array(
          createdInterview.questions.length
        ).fill("")
      );

    } catch (err) {
      console.error(
        "Start interview error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ANSWER CHANGE
  // =========================================================

  const handleAnswerChange = (
    event
  ) => {
    const value =
      event.target.value;

    setAnswers((previous) => {
      const updated = [...previous];

      updated[currentQuestion] =
        value;

      return updated;
    });

    setError("");
  };

  // =========================================================
  // NEXT QUESTION
  // =========================================================

  const handleNext = () => {
    if (!interview) {
      return;
    }

    const currentAnswer =
      answers[currentQuestion]?.trim();

    if (!currentAnswer) {
      setError(
        "Please answer this question before continuing."
      );

      return;
    }

    setError("");

    if (
      currentQuestion <
      interview.questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) =>
          previous + 1
      );
    }
  };

  // =========================================================
  // PREVIOUS QUESTION
  // =========================================================

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setError("");

      setCurrentQuestion(
        (previous) =>
          previous - 1
      );
    }
  };

  // =========================================================
  // GO TO QUESTION
  // =========================================================

  const handleQuestionChange = (
    index
  ) => {
    setError("");

    setCurrentQuestion(index);
  };

  // =========================================================
  // SUBMIT INTERVIEW
  // =========================================================

  const handleSubmit = async () => {
    if (!interview) {
      return;
    }

    const incomplete =
      answers.some(
        (answer) =>
          !answer ||
          !answer.trim()
      );

    if (incomplete) {
      setError(
        "Please answer all questions before submitting."
      );

      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const response =
        await submitInterview(
          interview._id,
          answers
        );

      console.log(
        "Interview submitted:",
        response
      );

      // -------------------------------------------------------
      // Save result
      // -------------------------------------------------------

      if (response?.interview) {
        sessionStorage.setItem(
          "interviewResult",
          JSON.stringify(
            response.interview
          )
        );
      }

      navigate(
        "/interview/result"
      );

    } catch (err) {
      console.error(
        "Submit interview error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit interview."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // START OVER
  // =========================================================

  const handleStartOver = () => {
    setInterview(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setError("");
  };

  // =========================================================
  // SETUP PAGE
  // =========================================================

  if (!interview) {
    return (
      <div className="interview-page">

        {/* ================= NAVBAR ================= */}

        <nav className="interview-navbar">

          <Link
            to="/"
            className="dashboard-logo"
          >
            Resume<span>IQ</span>
          </Link>

          <div className="interview-nav-links">

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/history">
              History
            </Link>

            <Link
              to="/interview"
              className="active"
            >
              Interview
            </Link>

            <Link to="/profile">
              Profile
            </Link>

          </div>

        </nav>


        {/* ================= MAIN ================= */}

        <main className="interview-container">

          {/* HERO */}

          <section className="interview-hero">

            <span className="interview-badge">
              AI Interview Practice
            </span>

            <h1>
              Practice Your Interview
            </h1>

            <p>
              Prepare for your next opportunity
              with AI-powered interview practice.
              Choose your role and difficulty level
              to get started.
            </p>

          </section>


          {/* SETUP CARD */}

          <section className="interview-setup-card">

            <div className="interview-setup-icon">
              💬
            </div>

            <h2>
              Configure Your Interview
            </h2>

            <p className="interview-setup-description">
              Select the role you are preparing
              for and choose your preferred
              difficulty level.
            </p>


            <form
              className="interview-form"
              onSubmit={
                handleStartInterview
              }
            >

              {/* JOB ROLE */}

              <div className="interview-form-group">

                <label htmlFor="jobRole">
                  Job Role
                </label>

                <select
                  id="jobRole"
                  value={jobRole}
                  onChange={(event) => {
                    setJobRole(
                      event.target.value
                    );

                    setError("");
                  }}
                >

                  <option value="">
                    Select a job role
                  </option>

                  {jobRoles.map(
                    (role) => (
                      <option
                        key={role}
                        value={role}
                      >
                        {role}
                      </option>
                    )
                  )}

                </select>

              </div>


              {/* DIFFICULTY */}

              <div className="interview-form-group">

                <label>
                  Difficulty Level
                </label>

                <div className="difficulty-grid">

                  {difficulties.map(
                    (level) => (
                      <button
                        key={level}
                        type="button"
                        className={
                          difficulty === level
                            ? "difficulty-option active"
                            : "difficulty-option"
                        }
                        onClick={() => {
                          setDifficulty(
                            level
                          );

                          setError("");
                        }}
                      >
                        {level}
                      </button>
                    )
                  )}

                </div>

              </div>


              {/* RESUME INFORMATION */}

              <div className="interview-resume-info">

                <span>
                  📄
                </span>

                <div>

                  <strong>
                    Resume-Based Practice
                  </strong>

                  {resumeLoading ? (

                    <p>
                      Checking your latest resume...
                    </p>

                  ) : resume ? (

                    <p>
                      <strong>
                        {resume.personalInfo?.name ||
                          resume.title ||
                          "Latest Resume"}
                      </strong>
                      {" "}will be connected to this interview.
                    </p>

                  ) : (

                    <p>
                      No resume found. You can still
                      practice role-specific questions.
                    </p>

                  )}

                </div>

              </div>


              {/* ERROR */}

              {error && (
                <div className="interview-error">
                  ⚠️ {error}
                </div>
              )}


              {/* START BUTTON */}

              <button
                type="submit"
                className="start-interview-btn"
                disabled={
                  loading ||
                  resumeLoading
                }
              >

                {loading
                  ? "Creating Interview..."
                  : resumeLoading
                  ? "Loading Resume..."
                  : "Start Interview"}

                {!loading &&
                  !resumeLoading && (
                    <span>
                      →
                    </span>
                  )}

              </button>

            </form>

          </section>


          {/* FEATURES */}

          <section className="interview-features">

            <div>

              <span>
                🎯
              </span>

              <h3>
                Role Focused
              </h3>

              <p>
                Practice questions designed
                around your selected role.
              </p>

            </div>


            <div>

              <span>
                🧠
              </span>

              <h3>
                Skill Assessment
              </h3>

              <p>
                Test your technical and
                problem-solving abilities.
              </p>

            </div>


            <div>

              <span>
                📊
              </span>

              <h3>
                Instant Feedback
              </h3>

              <p>
                Receive a score and feedback
                after completing the interview.
              </p>

            </div>

          </section>

        </main>

      </div>
    );
  }


  // =========================================================
  // QUESTION DATA
  // =========================================================

  const question =
    interview.questions[
      currentQuestion
    ];

  const totalQuestions =
    interview.questions.length;

  const progress =
    ((currentQuestion + 1) /
      totalQuestions) *
    100;

  const isLastQuestion =
    currentQuestion ===
    totalQuestions - 1;


  // =========================================================
  // QUESTION PAGE
  // =========================================================

  return (
    <div className="interview-page">

      {/* ================= NAVBAR ================= */}

      <nav className="interview-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="interview-nav-links">

          <span className="interview-role-label">
            {interview.jobRole}
          </span>

          <button
            type="button"
            className="exit-interview-btn"
            onClick={
              handleStartOver
            }
          >
            Exit
          </button>

        </div>

      </nav>


      {/* ================= QUESTION MAIN ================= */}

      <main className="interview-question-container">

        {/* PROGRESS */}

        <div className="interview-progress-section">

          <div className="interview-progress-info">

            <span>
              Question{" "}
              {currentQuestion + 1}{" "}
              of{" "}
              {totalQuestions}
            </span>

            <span>
              {interview.difficulty}
            </span>

          </div>

          <div className="interview-progress-bar">

            <div
              className="interview-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* QUESTION CARD */}

        <section className="interview-question-card">

          {/* CATEGORY */}

          <div className="question-category">
            {question?.category ||
              "General"}
          </div>


          {/* QUESTION */}

          <h1>
            {question?.question ||
              "Question unavailable"}
          </h1>


          <p className="question-helper">
            Take your time and provide a clear,
            structured answer. Include examples
            whenever possible.
          </p>


          {/* ANSWER */}

          <textarea
            className="interview-answer-input"
            placeholder="Type your answer here..."
            value={
              answers[currentQuestion] ||
              ""
            }
            onChange={
              handleAnswerChange
            }
            rows={10}
          />


          {/* ERROR */}

          {error && (
            <div className="interview-error">
              ⚠️ {error}
            </div>
          )}


          {/* ACTIONS */}

          <div className="interview-question-actions">

            <button
              type="button"
              className="previous-question-btn"
              disabled={
                currentQuestion === 0
              }
              onClick={
                handlePrevious
              }
            >
              ← Previous
            </button>


            {!isLastQuestion ? (

              <button
                type="button"
                className="next-question-btn"
                onClick={
                  handleNext
                }
              >
                Next Question

                <span>
                  →
                </span>

              </button>

            ) : (

              <button
                type="button"
                className="submit-interview-btn"
                disabled={submitting}
                onClick={
                  handleSubmit
                }
              >

                {submitting
                  ? "Submitting..."
                  : "Submit Interview"}

                {!submitting && (
                  <span>
                    ✓
                  </span>
                )}

              </button>

            )}

          </div>

        </section>


        {/* QUESTION NUMBERS */}

        <div className="question-navigation">

          {interview.questions.map(
            (item, index) => {

              const answered =
                answers[index]?.trim();

              return (
                <button
                  key={
                    item._id || index
                  }
                  type="button"
                  className={`
                    question-number
                    ${
                      index ===
                      currentQuestion
                        ? "active"
                        : ""
                    }
                    ${
                      answered
                        ? "answered"
                        : ""
                    }
                  `}
                  onClick={() =>
                    handleQuestionChange(
                      index
                    )
                  }
                >
                  {index + 1}
                </button>
              );
            }
          )}

        </div>

      </main>

    </div>
  );
}

export default Interview;