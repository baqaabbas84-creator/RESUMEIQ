import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getInterviewById,
  getSavedInterviewId,
} from "../../services/interviewService";

function InterviewResult() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD RESULT FROM BACKEND
  // =========================================================

  useEffect(() => {
    const loadResult = async () => {
      try {
        setLoading(true);
        setError("");

        // First get saved interview ID
        const interviewId =
          getSavedInterviewId();

        // If no ID exists, fallback to sessionStorage
        if (!interviewId) {
          const storedResult =
            sessionStorage.getItem(
              "interviewResult"
            );

          if (storedResult) {
            try {
              const parsedResult =
                JSON.parse(
                  storedResult
                );

              setResult(parsedResult);
              return;
            } catch (parseError) {
              console.error(
                "Failed to parse stored result:",
                parseError
              );
            }
          }

          navigate("/interview");
          return;
        }

        // =====================================================
        // GET INTERVIEW FROM BACKEND
        // =====================================================

        const response =
          await getInterviewById(
            interviewId
          );

        console.log(
          "Interview result loaded:",
          response
        );

        const interviewData =
          response?.interview ||
          response;

        if (!interviewData) {
          throw new Error(
            "Interview result was not found."
          );
        }

        setResult(
          interviewData
        );

        // Keep sessionStorage as a temporary cache
        sessionStorage.setItem(
          "interviewResult",
          JSON.stringify(
            interviewData
          )
        );

      } catch (err) {
        console.error(
          "Failed to load interview result:",
          err
        );

        // =====================================================
        // FALLBACK TO SESSION STORAGE
        // =====================================================

        const storedResult =
          sessionStorage.getItem(
            "interviewResult"
          );

        if (storedResult) {
          try {
            const parsedResult =
              JSON.parse(
                storedResult
              );

            setResult(parsedResult);
            return;
          } catch (parseError) {
            console.error(
              "Fallback result parsing failed:",
              parseError
            );
          }
        }

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load interview result."
        );

      } finally {
        setLoading(false);
      }
    };

    loadResult();
  }, [navigate]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="interview-result-loading">
        Loading result...
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !result) {
    return (
      <div className="interview-result-loading">

        <p>
          {error}
        </p>

        <button
          type="button"
          className="practice-again-btn"
          onClick={() =>
            navigate("/interview")
          }
        >
          Start Interview
          <span>
            →
          </span>
        </button>

      </div>
    );
  }

  // =========================================================
  // NO RESULT
  // =========================================================

  if (!result) {
    return (
      <div className="interview-result-loading">
        No interview result found.
      </div>
    );
  }

  // =========================================================
  // SCORE
  // =========================================================

  const score =
    Number(result.totalScore) || 0;

  // =========================================================
  // PERFORMANCE
  // =========================================================

  const getPerformance = () => {
    if (score >= 85) {
      return {
        title:
          "Excellent Performance!",
        description:
          "Your interview performance was excellent. Keep practicing to maintain your confidence.",
        className:
          "excellent",
      };
    }

    if (score >= 70) {
      return {
        title:
          "Good Performance!",
        description:
          "You performed well. A little more practice can make your answers even stronger.",
        className:
          "good",
      };
    }

    if (score >= 50) {
      return {
        title:
          "Keep Practicing!",
        description:
          "You have a good foundation. Focus on improving your explanations and technical depth.",
        className:
          "average",
      };
    }

    return {
      title:
        "Needs Improvement",
      description:
        "Keep practicing and work on giving clearer, more detailed answers.",
      className:
        "needs-improvement",
    };
  };

  const performance =
    getPerformance();

  // =========================================================
  // PRACTICE AGAIN
  // =========================================================

  const handlePracticeAgain = () => {
    sessionStorage.removeItem(
      "interviewResult"
    );

    localStorage.removeItem(
      "currentInterviewId"
    );

    navigate("/interview");
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return null;
    }

    try {
      return new Date(
        date
      ).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return null;
    }
  };

  const completedDate =
    formatDate(
      result.completedAt ||
        result.updatedAt
    );

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="interview-result-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="interview-result-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="interview-result-nav-links">

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
          MAIN
      ===================================================== */}

      <main className="interview-result-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <section className="result-header">

          <div className="result-success-icon">
            ✓
          </div>

          <span className="result-badge">
            Interview Completed
          </span>

          <h1>
            Your Interview Results
          </h1>

          <p>
            Here is a detailed breakdown of
            your interview performance.
          </p>

        </section>


        {/* ===================================================
            SCORE CARD
        =================================================== */}

        <section
          className={`result-score-card ${performance.className}`}
        >

          <div className="score-circle">

            <div className="score-number">
              {score}
            </div>

            <div className="score-label">
              / 100
            </div>

          </div>


          <div className="score-information">

            <span className="result-performance-label">
              {result.jobRole ||
                "Interview"}
            </span>

            <h2>
              {performance.title}
            </h2>

            <p>
              {performance.description}
            </p>

            <div className="result-meta">

              <span>
                🎯{" "}
                {result.difficulty ||
                  "Medium"}
              </span>

              <span>
                ❓{" "}
                {result.questions?.length ||
                  0}{" "}
                Questions
              </span>

              <span>
                ✓ Completed
              </span>

            </div>

            {completedDate && (
              <div className="result-meta">
                <span>
                  🕒 {completedDate}
                </span>
              </div>
            )}

          </div>

        </section>


        {/* ===================================================
            QUESTION RESULTS
        =================================================== */}

        <section className="question-results-section">

          <div className="result-section-heading">

            <div>

              <h2>
                Question-wise Feedback
              </h2>

              <p>
                Review your answers and improve
                your weak areas.
              </p>

            </div>

          </div>


          <div className="question-results-list">

            {result.questions?.map(
              (
                question,
                index
              ) => {

                const questionScore =
                  Number(
                    question.score
                  ) || 0;

                return (
                  <article
                    className="result-question-card"
                    key={
                      question._id ||
                      index
                    }
                  >

                    {/* =====================================
                        QUESTION TOP
                    ===================================== */}

                    <div className="result-question-top">

                      <div className="result-question-number">
                        {index + 1}
                      </div>

                      <div className="result-question-content">

                        <span className="result-question-category">
                          {question.category ||
                            "General"}
                        </span>

                        <h3>
                          {question.question}
                        </h3>

                      </div>

                      <div
                        className={`question-score ${
                          questionScore >= 8
                            ? "high"
                            : questionScore >= 6
                            ? "medium"
                            : "low"
                        }`}
                      >

                        {questionScore}

                        <small>
                          /10
                        </small>

                      </div>

                    </div>


                    {/* =====================================
                        ANSWER
                    ===================================== */}

                    <div className="result-answer-box">

                      <div className="result-answer-heading">
                        Your Answer
                      </div>

                      <p>
                        {question.answer ||
                          "No answer provided."}
                      </p>

                    </div>


                    {/* =====================================
                        FEEDBACK
                    ===================================== */}

                    <div className="result-feedback-box">

                      <div className="result-feedback-icon">
                        💡
                      </div>

                      <div>

                        <strong>
                          AI Feedback
                        </strong>

                        <p>
                          {question.feedback ||
                            "No feedback available."}
                        </p>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </section>


        {/* ===================================================
            ACTIONS
        =================================================== */}

        <section className="result-actions">

          <button
            type="button"
            className="practice-again-btn"
            onClick={
              handlePracticeAgain
            }
          >
            Practice Again

            <span>
              →
            </span>

          </button>


          <Link
            to="/dashboard"
            className="result-dashboard-btn"
          >
            Back to Dashboard
          </Link>

        </section>

      </main>

    </div>
  );
}

export default InterviewResult;