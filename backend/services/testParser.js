const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    // Uploaded resume file
    file: {
      originalName: {
        type: String,
        default: ""
      },

      filename: {
        type: String,
        default: ""
      },

      mimetype: {
        type: String,
        default: ""
      },

      size: {
        type: Number,
        default: 0
      },

      url: {
        type: String,
        default: ""
      }
    },

    // Extracted raw text
    extractedText: {
      type: String,
      default: ""
    },

    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String
    },

    summary: {
      type: String,
      default: ""
    },

    education: [
      {
        degree: String,
        institution: String,
        startYear: String,
        endYear: String,
        grade: String
      }
    ],

    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String
      }
    ],

    skills: [
      {
        type: String
      }
    ],

    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
        link: String
      }
    ],

    certifications: [
      {
        name: String,
        organization: String,
        year: String
      }
    ],

    // ATS analysis
    atsScore: {
      type: Number,
      default: null
    },

    atsAnalysis: {
      strengths: {
        type: [String],
        default: []
      },

      weaknesses: {
        type: [String],
        default: []
      },

      suggestions: {
        type: [String],
        default: []
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resume", resumeSchema);