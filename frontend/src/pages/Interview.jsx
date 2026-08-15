import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const [role, setRole] = useState("Software Developer");
  const [difficulty, setDifficulty] = useState("Medium");

  const questions = [
    {
      question:
        "Explain the difference between an interface and an abstract class in Java.",
      category: "Java",
    },
    {
      question:
        "What is dependency injection in Spring Boot and why is it useful?",
      category: "Spring Boot",
    },
    {
      question:
        "What is the difference between SQL JOIN and UNION?",
      category: "SQL",
    },
    {
      question:
        "How would you improve the performance of a React application?",
      category: "React",
    },
    {
      question:
        "Explain how REST APIs work and what HTTP methods are commonly used.",
      category: "Backend",
    },
  ];

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setAnswer("");
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      setAnswer("");
      return;
    }

    // LAST QUESTION
    navigate("/interview/result");
  };

  return (
    <div className="interview-page">

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


      {!started ? (

        <main className="interview-container">

          <div className="interview-header">

            <span className="upload-badge">
              AI Interview Preparation
            </span>

            <h1>
              Prepare for Your Interview
            </h1>

            <p>
              Practice interview questions based on your target role.
            </p>

          </div>


          <section className="interview-setup-card">

            <div className="interview-setup-icon">
              💬
            </div>

            <h2>
              Start Mock Interview
            </h2>

            <p>
              Choose your preferences and start practicing.
            </p>


            <div className="interview-form">

              <div className="interview-field">

                <label>
                  Target Job Role
                </label>

                <select
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                >
                  <option>Software Developer</option>
                  <option>Java Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                </select>

              </div>


              <div className="interview-field">

                <label>
                  Difficulty
                </label>

                <select
                  value={difficulty}
                  onChange={(event) =>
                    setDifficulty(event.target.value)
                  }
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>

              </div>

            </div>


            <div className="interview-info">

              <div>
                <strong>5</strong>
                <span>Questions</span>
              </div>

              <div>
                <strong>{difficulty}</strong>
                <span>Difficulty</span>
              </div>

              <div>
                <strong>AI</strong>
                <span>Powered</span>
              </div>

            </div>


            <button
              type="button"
              className="start-interview-btn"
              onClick={handleStart}
            >
              Start Interview
              <span>→</span>
            </button>

          </section>

        </main>

      ) : (

        <main className="interview-container">

          <div className="interview-progress">

            <div>

              <span>
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </span>

              <strong>
                {role}
              </strong>

            </div>

            <div className="progress-track">

              <div
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              ></div>

            </div>

          </div>


          <section className="question-card">

            <div className="question-top">

              <span className="question-category">
                {questions[currentQuestion].category}
              </span>

              <span className="question-difficulty">
                {difficulty}
              </span>

            </div>


            <h1>
              {questions[currentQuestion].question}
            </h1>


            <div className="answer-area">

              <label>
                Your Answer
              </label>

              <textarea
                value={answer}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
                placeholder="Write your answer here..."
              />

              <span>
                {answer.length} characters
              </span>

            </div>


            <div className="question-actions">

              <button
                type="button"
                className="skip-question-btn"
                onClick={handleNext}
              >
                Skip
              </button>


              <button
                type="button"
                className="next-question-btn"
                onClick={handleNext}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Interview"
                  : "Next Question"}

                <span>→</span>

              </button>

            </div>

          </section>

        </main>

      )}

    </div>
  );
}

export default Interview;