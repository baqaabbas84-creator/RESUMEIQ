const Interview = require("../models/Interview");
const Resume = require("../models/Resume");
const questionBank = require("../data/interviewQuestions");


// =========================================================
// NORMALIZE TEXT
// =========================================================

const normalizeText = (value) => {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#.\- ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};


// =========================================================
// SHUFFLE ARRAY
// =========================================================

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [
      shuffled[i],
      shuffled[j],
    ] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};


// =========================================================
// EXTRACT RESUME KEYWORDS
// =========================================================

const getResumeKeywords = (resume) => {
  const keywords = new Set();

  if (!resume) {
    return [];
  }

  // -------------------------------------------------------
  // Skills
  // -------------------------------------------------------

  if (Array.isArray(resume.skills)) {
    resume.skills.forEach((skill) => {
      const normalized =
        normalizeText(skill);

      if (normalized) {
        keywords.add(normalized);
      }
    });
  }

  // -------------------------------------------------------
  // Experience
  // -------------------------------------------------------

  if (
    Array.isArray(
      resume.experience
    )
  ) {
    resume.experience.forEach(
      (experience) => {
        [
          experience.position,
          experience.company,
          experience.description,
        ].forEach((value) => {
          const normalized =
            normalizeText(value);

          if (normalized) {
            keywords.add(normalized);
          }
        });
      }
    );
  }

  // -------------------------------------------------------
  // Projects
  // -------------------------------------------------------

  if (
    Array.isArray(
      resume.projects
    )
  ) {
    resume.projects.forEach(
      (project) => {
        [
          project.name,
          project.description,
        ].forEach((value) => {
          const normalized =
            normalizeText(value);

          if (normalized) {
            keywords.add(normalized);
          }
        });

        if (
          Array.isArray(
            project.technologies
          )
        ) {
          project.technologies.forEach(
            (technology) => {
              const normalized =
                normalizeText(
                  technology
                );

              if (normalized) {
                keywords.add(
                  normalized
                );
              }
            }
          );
        }
      }
    );
  }

  // -------------------------------------------------------
  // Summary
  // -------------------------------------------------------

  if (resume.summary) {
    const summary =
      normalizeText(
        resume.summary
      );

    if (summary) {
      keywords.add(summary);
    }
  }

  return [...keywords];
};


// =========================================================
// SCORE QUESTION AGAINST RESUME
// =========================================================

const getQuestionRelevanceScore = (
  question,
  resumeKeywords
) => {
  if (
    !resumeKeywords ||
    resumeKeywords.length === 0
  ) {
    return 0;
  }

  const questionKeywords =
    Array.isArray(
      question.keywords
    )
      ? question.keywords
      : [];

  let score = 0;

  questionKeywords.forEach(
    (keyword) => {
      const normalizedKeyword =
        normalizeText(keyword);

      if (!normalizedKeyword) {
        return;
      }

      const matched =
        resumeKeywords.some(
          (resumeKeyword) =>
            resumeKeyword.includes(
              normalizedKeyword
            ) ||
            normalizedKeyword.includes(
              resumeKeyword
            )
        );

      if (matched) {
        score += 1;
      }
    }
  );

  return score;
};


// =========================================================
// CREATE INTERVIEW
// =========================================================

const createInterview = async (
  req,
  res
) => {
  try {
    const {
      jobRole,
      difficulty = "Medium",
      resumeId = null,
    } = req.body;

    // -------------------------------------------------------
    // Validate job role
    // -------------------------------------------------------

    if (!jobRole) {
      return res.status(400).json({
        message:
          "Job role is required",
      });
    }

    // -------------------------------------------------------
    // Validate difficulty
    // -------------------------------------------------------

    const selectedDifficulty = [
      "Easy",
      "Medium",
      "Hard",
    ].includes(difficulty)
      ? difficulty
      : "Medium";

    // -------------------------------------------------------
    // Find resume
    // -------------------------------------------------------

    let resume = null;

    if (resumeId) {
      resume = await Resume.findOne({
        _id: resumeId,
        userId: req.user,
      });

      if (!resume) {
        return res.status(404).json({
          message:
            "Selected resume not found",
        });
      }
    }

    // -------------------------------------------------------
    // Get question pool
    // -------------------------------------------------------

    let questionPool =
      questionBank[
        "Software Developer"
      ]?.[selectedDifficulty] || [];

    if (
      questionBank[jobRole]?.[
        selectedDifficulty
      ]
    ) {
      questionPool =
        questionBank[jobRole][
          selectedDifficulty
        ];
    }

    if (
      !Array.isArray(
        questionPool
      ) ||
      questionPool.length === 0
    ) {
      return res.status(400).json({
        message:
          "No questions available for this job role and difficulty.",
      });
    }

    // -------------------------------------------------------
    // Get previous questions
    // -------------------------------------------------------

    const previousInterviews =
      await Interview.find({
        userId: req.user,
        jobRole,
        difficulty:
          selectedDifficulty,
      }).select(
        "questions.question"
      );

    const previousQuestions =
      new Set();

    previousInterviews.forEach(
      (interview) => {
        if (
          Array.isArray(
            interview.questions
          )
        ) {
          interview.questions.forEach(
            (question) => {
              if (
                question.question
              ) {
                previousQuestions.add(
                  normalizeText(
                    question.question
                  )
                );
              }
            }
          );
        }
      }
    );

    // -------------------------------------------------------
    // Remove previously asked questions
    // -------------------------------------------------------

    let availableQuestions =
      questionPool.filter(
        (question) =>
          !previousQuestions.has(
            normalizeText(
              question.question
            )
          )
      );

    // -------------------------------------------------------
    // If less than 5 questions remain,
    // use complete question pool.
    // -------------------------------------------------------

    if (
      availableQuestions.length < 5
    ) {
      availableQuestions =
        [...questionPool];
    }

    // -------------------------------------------------------
    // Resume personalization
    // -------------------------------------------------------

    const resumeKeywords =
      getResumeKeywords(
        resume
      );

    let personalizedQuestions =
      availableQuestions;

    if (
      resumeKeywords.length > 0
    ) {
      const scoredQuestions =
        availableQuestions.map(
          (question) => ({
            ...question,

            relevanceScore:
              getQuestionRelevanceScore(
                question,
                resumeKeywords
              ),
          })
        );

      const relevantQuestions =
        scoredQuestions.filter(
          (question) =>
            question.relevanceScore >
            0
        );

      // -----------------------------------------------------
      // If enough relevant questions exist,
      // prioritize them.
      // -----------------------------------------------------

      if (
        relevantQuestions.length >= 5
      ) {
        personalizedQuestions =
          relevantQuestions;
      } else {
        // ---------------------------------------------------
        // Combine relevant questions with remaining questions
        // ---------------------------------------------------

        const sortedQuestions =
          [...scoredQuestions].sort(
            (a, b) =>
              b.relevanceScore -
              a.relevanceScore
          );

        personalizedQuestions =
          sortedQuestions;
      }
    }

    // -------------------------------------------------------
    // Shuffle
    // -------------------------------------------------------

    const shuffledQuestions =
      shuffleArray(
        personalizedQuestions
      );

    // -------------------------------------------------------
    // Select 5
    // -------------------------------------------------------

    const selectedQuestions =
      shuffledQuestions.slice(
        0,
        5
      );

    // -------------------------------------------------------
    // Safety fallback
    // -------------------------------------------------------

    if (
      selectedQuestions.length <
      5
    ) {
      return res.status(500).json({
        message:
          "Not enough questions available.",
      });
    }

    // -------------------------------------------------------
    // Prepare questions
    // -------------------------------------------------------

    const questions =
      selectedQuestions.map(
        (item) => ({
          question:
            item.question,

          category:
            item.category ||
            "General",

          answer: "",

          score: null,

          feedback: "",
        })
      );

    // -------------------------------------------------------
    // Create interview
    // -------------------------------------------------------

    const interview =
      await Interview.create({
        userId: req.user,

        resumeId:
          resume?._id || null,

        jobRole,

        difficulty:
          selectedDifficulty,

        questions,

        status: "created",
      });

    // -------------------------------------------------------
    // Response
    // -------------------------------------------------------

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
      message:
        "Failed to create interview",

      error:
        error.message,
    });
  }
};


// =========================================================
// GET ALL INTERVIEWS
// =========================================================

const getInterviews = async (
  req,
  res
) => {
  try {
    const interviews =
      await Interview.find({
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
      count:
        interviews.length,

      interviews,
    });

  } catch (error) {
    console.error(
      "Get interviews error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch interviews",

      error:
        error.message,
    });
  }
};


// =========================================================
// GET SINGLE INTERVIEW
// =========================================================

const getInterviewById =
  async (
    req,
    res
  ) => {
    try {
      const interview =
        await Interview.findOne({
          _id:
            req.params.id,

          userId:
            req.user,
        }).populate(
          "resumeId",
          "title atsScore personalInfo skills projects experience"
        );

      if (!interview) {
        return res.status(404).json({
          message:
            "Interview not found",
        });
      }

      res.json(
        interview
      );

    } catch (error) {
      console.error(
        "Get interview error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch interview",

        error:
          error.message,
      });
    }
  };


// =========================================================
// SUBMIT INTERVIEW
// =========================================================

const submitInterview =
  async (
    req,
    res
  ) => {
    try {
      const {
        answers,
      } = req.body;

      const interview =
        await Interview.findOne({
          _id:
            req.params.id,

          userId:
            req.user,
        });

      if (!interview) {
        return res.status(404).json({
          message:
            "Interview not found",
        });
      }

      if (
        !Array.isArray(
          answers
        )
      ) {
        return res.status(400).json({
          message:
            "Answers must be an array",
        });
      }

      let totalScore = 0;

      interview.questions =
        interview.questions.map(
          (
            question,
            index
          ) => {
            const submitted =
              answers[index] ||
              "";

            const answer =
              typeof submitted ===
              "string"
                ? submitted.trim()
                : "";

            let score = 0;

            if (
              answer.length >=
              100
            ) {
              score = 9;
            } else if (
              answer.length >=
              70
            ) {
              score = 8;
            } else if (
              answer.length >=
              50
            ) {
              score = 7;
            } else if (
              answer.length >=
              30
            ) {
              score = 6;
            } else if (
              answer.length >=
              15
            ) {
              score = 4;
            } else if (
              answer.length > 0
            ) {
              score = 2;
            }

            let feedback =
              "Try to provide a more detailed answer.";

            if (
              score >= 8
            ) {
              feedback =
                "Strong and detailed answer. Good explanation.";
            } else if (
              score >= 6
            ) {
              feedback =
                "Good answer. Add more specific examples to make it stronger.";
            } else if (
              score >= 4
            ) {
              feedback =
                "Your answer has a good starting point, but needs more detail.";
            } else if (
              score >= 2
            ) {
              feedback =
                "Answer is too brief. Explain your reasoning and provide examples.";
            }

            totalScore +=
              score;

            question.answer =
              answer;

            question.score =
              score;

            question.feedback =
              feedback;

            return question;
          }
        );

      const maximumScore =
        interview.questions.length *
        10;

      const percentage =
        maximumScore > 0
          ? Math.round(
              (totalScore /
                maximumScore) *
                100
            )
          : 0;

      interview.totalScore =
        percentage;

      interview.status =
        "completed";

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

        error:
          error.message,
      });
    }
  };


// =========================================================
// DELETE INTERVIEW
// =========================================================

const deleteInterview =
  async (
    req,
    res
  ) => {
    try {
      const interview =
        await Interview.findOneAndDelete({
          _id:
            req.params.id,

          userId:
            req.user,
        });

      if (!interview) {
        return res.status(404).json({
          message:
            "Interview not found",
        });
      }

      res.json({
        message:
          "Interview deleted successfully",
      });

    } catch (error) {
      console.error(
        "Delete interview error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete interview",

        error:
          error.message,
      });
    }
  };


// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  createInterview,
  getInterviews,
  getInterviewById,
  submitInterview,
  deleteInterview,
};