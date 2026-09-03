const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      default: "",
      trim: true,
    },

    institution: {
      type: String,
      default: "",
      trim: true,
    },

    startYear: {
      type: String,
      default: "",
      trim: true,
    },

    endYear: {
      type: String,
      default: "",
      trim: true,
    },

    grade: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);


const experienceSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      default: "",
      trim: true,
    },

    company: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: String,
      default: "",
      trim: true,
    },

    endDate: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);


const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    link: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  }
);


const certificationSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        default: "",
        trim: true,
      },

      organization: {
        type: String,
        default: "",
        trim: true,
      },

      year: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );


const personalInfoSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      location: {
        type: String,
        default: "",
        trim: true,
      },

      linkedin: {
        type: String,
        default: "",
        trim: true,
      },

      github: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );


const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "My Resume",
      trim: true,
    },

    personalInfo: {
      type: personalInfoSchema,
      default: () => ({}),
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    experience: {
      type: [experienceSchema],
      default: [],
    },

    projects: {
      type: [projectSchema],
      default: [],
    },

    certifications: {
      type: [certificationSchema],
      default: [],
    },

    atsScore: {
      type: Number,
      default: null,
    },

    sourceFile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Resume",
  resumeSchema
);