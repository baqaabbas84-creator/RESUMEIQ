const Interview = require("../models/Interview");
const Resume = require("../models/Resume");


// =========================================================
// QUESTION BANK
// =========================================================

const questionBank = {
  "Software Developer": {
    Easy: [
      {
        question: "Tell me about yourself.",
        category: "Introduction",
      },
      {
        question:
          "What programming languages are you comfortable with?",
        category: "Technical",
      },
      {
        question:
          "What is the difference between frontend and backend development?",
        category: "Technical",
      },
      {
        question:
          "What is an API and why is it used?",
        category: "Technical",
      },
      {
        question:
          "Tell me about a project you have worked on.",
        category: "Project",
      },
    ],

    Medium: [
      {
        question:
          "Explain how you would design a scalable web application.",
        category: "System Design",
      },
      {
        question:
          "What is the difference between SQL and NoSQL databases?",
        category: "Database",
      },
      {
        question:
          "Explain REST APIs and HTTP methods.",
        category: "Backend",
      },
      {
        question:
          "How would you debug a slow web application?",
        category: "Problem Solving",
      },
      {
        question:
          "Describe a difficult technical problem you solved.",
        category: "Problem Solving",
      },
    ],

    Hard: [
      {
        question:
          "How would you design a highly scalable distributed application?",
        category: "System Design",
      },
      {
        question:
          "Explain database indexing and its performance implications.",
        category: "Database",
      },
      {
        question:
          "How would you handle millions of concurrent API requests?",
        category: "Backend",
      },
      {
        question:
          "Explain caching strategies for a large-scale application.",
        category: "System Design",
      },
      {
        question:
          "How would you identify and resolve a production performance bottleneck?",
        category: "Problem Solving",
      },
    ],
  },

  "Frontend Developer": {
    Easy: [
      {
        question: "What is React?",
        category: "React",
      },
      {
        question:
          "What is the difference between props and state?",
        category: "React",
      },
      {
        question:
          "What is the purpose of HTML, CSS and JavaScript?",
        category: "Frontend",
      },
      {
        question:
          "What is responsive web design?",
        category: "Frontend",
      },
      {
        question:
          "Tell me about a frontend project you built.",
        category: "Project",
      },
    ],

    Medium: [
      {
        question:
          "Explain React component lifecycle and hooks.",
        category: "React",
      },
      {
        question:
          "How does state management work in React?",
        category: "React",
      },
      {
        question:
          "How would you optimize a slow React application?",
        category: "Performance",
      },
      {
        question:
          "What is code splitting and why is it useful?",
        category: "Performance",
      },
      {
        question:
          "How would you build a reusable component system?",
        category: "Architecture",
      },
    ],

    Hard: [
      {
        question:
          "Explain how React reconciliation works.",
        category: "React",
      },
      {
        question:
          "How would you architect a large-scale React application?",
        category: "Architecture",
      },
      {
        question:
          "How would you optimize rendering performance in a complex React application?",
        category: "Performance",
      },
      {
        question:
          "How would you implement scalable frontend state management?",
        category: "Architecture",
      },
      {
        question:
          "How would you design a frontend application for millions of users?",
        category: "System Design",
      },
    ],
  },

  "Backend Developer": {
    Easy: [
      {
        question:
          "What is a backend server?",
        category: "Backend",
      },
      {
        question:
          "What is Node.js?",
        category: "Node.js",
      },
      {
        question:
          "What is an API?",
        category: "Backend",
      },
      {
        question:
          "What is middleware?",
        category: "Node.js",
      },
      {
        question:
          "Tell me about a backend project you built.",
        category: "Project",
      },
    ],

    Medium: [
      {
        question:
          "Explain authentication and authorization.",
        category: "Security",
      },
      {
        question:
          "What is JWT and how does it work?",
        category: "Security",
      },
      {
        question:
          "How would you design a REST API?",
        category: "API",
      },
      {
        question:
          "How would you improve database query performance?",
        category: "Database",
      },
      {
        question:
          "How would you handle errors in a Node.js application?",
        category: "Node.js",
      },
    ],

    Hard: [
      {
        question:
          "How would you design a scalable backend architecture?",
        category: "Architecture",
      },
      {
        question:
          "How would you handle distributed transactions?",
        category: "Backend",
      },
      {
        question:
          "How would you protect an API from common security attacks?",
        category: "Security",
      },
      {
        question:
          "How would you scale a Node.js application horizontally?",
        category: "Scalability",
      },
      {
        question:
          "How would you design a backend capable of handling millions of requests?",
        category: "System Design",
      },
    ],
  },

  "AI/ML Engineer": {
    Easy: [
      {
        question:
          "What is machine learning?",
        category: "Machine Learning",
      },
      {
        question:
          "What is the difference between supervised and unsupervised learning?",
        category: "Machine Learning",
      },
      {
        question:
          "What is a training dataset?",
        category: "Machine Learning",
      },
      {
        question:
          "What is Python commonly used for in AI?",
        category: "Python",
      },
      {
        question:
          "Tell me about an AI or ML project you have worked on.",
        category: "Project",
      },
    ],

    Medium: [
      {
        question:
          "Explain overfitting and how to prevent it.",
        category: "Machine Learning",
      },
      {
        question:
          "What is the difference between classification and regression?",
        category: "Machine Learning",
      },
      {
        question:
          "Explain precision, recall and F1 score.",
        category: "Evaluation",
      },
      {
        question:
          "How would you handle missing data?",
        category: "Data Processing",
      },
      {
        question:
          "How would you deploy a machine learning model?",
        category: "Deployment",
      },
    ],

    Hard: [
      {
        question:
          "How would you design an end-to-end ML system for production?",
        category: "ML System Design",
      },
      {
        question:
          "How would you detect and solve model drift?",
        category: "MLOps",
      },
      {
        question:
          "How would you optimize inference latency for an ML model?",
        category: "Optimization",
      },
      {
        question:
          "Explain the bias-variance tradeoff in detail.",
        category: "Machine Learning",
      },
      {
        question:
          "How would you monitor a machine learning system in production?",
        category: "MLOps",
      },
    ],
  },
};


// =========================================================
// CREATE INTERVIEW
// =========================================================

const createInterview = async (req, res) => {
  try {
    const {
      jobRole,
      difficulty = "Medium",
      resumeId = null,
    } = req.body;

    if (!jobRole) {
      return res.status(400).json({
        message: "Job role is required",
      });
    }

    const selectedDifficulty = [
      "Easy",
      "Medium",
      "Hard",
    ].includes(difficulty)
      ? difficulty
      : "Medium";

    let selectedQuestions =
      questionBank["Software Developer"][
        selectedDifficulty
      ];

    if (questionBank[jobRole]) {
      selectedQuestions =
        questionBank[jobRole][
          selectedDifficulty
        ];
    }

    // Copy questions so each interview gets its own objects
    const questions = selectedQuestions.map(
      (item) => ({
        question: item.question,
        category: item.category,
        answer: "",
        score: null,
        feedback: "",
      })
    );

    const interview = await Interview.create({
      userId: req.user,
      resumeId,
      jobRole,
      difficulty: selectedDifficulty,
      questions,
      status: "created",
    });

    res.status(201).json({
      message:
        "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error(
      "Create interview error:",
      error
    );

    res.status(500).json({
      message: "Failed to create interview",
      error: error.message,
    });
  }
};


// =========================================================
// GET ALL INTERVIEWS
// =========================================================

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.user,
    })
      .populate(
        "resumeId",
        "title atsScore personalInfo"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch interviews",
      error: error.message,
    });
  }
};


// =========================================================
// GET SINGLE INTERVIEW
// =========================================================

const getInterviewById = async (req, res) => {
  try {
    const interview =
      await Interview.findOne({
        _id: req.params.id,
        userId: req.user,
      }).populate(
        "resumeId",
        "title atsScore personalInfo skills"
      );

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch interview",
      error: error.message,
    });
  }
};


// =========================================================
// SUBMIT INTERVIEW
// =========================================================

const submitInterview = async (req, res) => {
  try {
    const {
      answers,
    } = req.body;

    const interview =
      await Interview.findOne({
        _id: req.params.id,
        userId: req.user,
      });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        message:
          "Answers must be an array",
      });
    }

    let totalScore = 0;

    interview.questions =
      interview.questions.map(
        (question, index) => {
          const submitted =
            answers[index] || "";

          const answer =
            typeof submitted === "string"
              ? submitted.trim()
              : "";

          let score = 0;

          if (answer.length >= 100) {
            score = 9;
          } else if (answer.length >= 70) {
            score = 8;
          } else if (answer.length >= 50) {
            score = 7;
          } else if (answer.length >= 30) {
            score = 6;
          } else if (answer.length >= 15) {
            score = 4;
          } else if (answer.length > 0) {
            score = 2;
          }

          let feedback =
            "Try to provide a more detailed answer.";

          if (score >= 8) {
            feedback =
              "Strong and detailed answer. Good explanation.";
          } else if (score >= 6) {
            feedback =
              "Good answer. Add more specific examples to make it stronger.";
          } else if (score >= 4) {
            feedback =
              "Your answer has a good starting point, but needs more detail.";
          } else if (score >= 2) {
            feedback =
              "Answer is too brief. Explain your reasoning and provide examples.";
          }

          totalScore += score;

          question.answer = answer;
          question.score = score;
          question.feedback = feedback;

          return question;
        }
      );

    const maximumScore =
      interview.questions.length * 10;

    const percentage =
      maximumScore > 0
        ? Math.round(
            (totalScore / maximumScore) *
              100
          )
        : 0;

    interview.totalScore = percentage;

    interview.status = "completed";

    interview.completedAt =
      new Date();

    await interview.save();

    res.json({
      message:
        "Interview submitted successfully",
      interview,
    });
  } catch (error) {
    console.error(
      "Submit interview error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to submit interview",
      error: error.message,
    });
  }
};


// =========================================================
// DELETE INTERVIEW
// =========================================================

const deleteInterview = async (req, res) => {
  try {
    const interview =
      await Interview.findOneAndDelete({
        _id: req.params.id,
        userId: req.user,
      });

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    res.json({
      message:
        "Interview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to delete interview",
      error: error.message,
    });
  }
};


module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  submitInterview,
  deleteInterview,
};