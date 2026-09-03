const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      default: null,
    },

    jobRole: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },

    questions: [
      {
        question: {
          type: String,
          required: true,
        },

        category: {
          type: String,
          default: "General",
        },

        answer: {
          type: String,
          default: "",
        },

        score: {
          type: Number,
          default: null,
        },

        feedback: {
          type: String,
          default: "",
        },
      },
    ],

    totalScore: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
      default: "created",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);