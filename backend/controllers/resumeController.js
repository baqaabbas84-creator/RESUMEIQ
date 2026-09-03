const Resume = require("../models/Resume");
const {
  generateResumePDF,
} = require("../services/pdfService");

// =========================================================
// CREATE RESUME
// =========================================================

const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user,
      ...req.body,
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create resume",
      error: error.message,
    });
  }
};


// =========================================================
// GET ALL RESUMES
// =========================================================

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json({
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};


// =========================================================
// GET SINGLE RESUME
// =========================================================

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};


// =========================================================
// UPDATE RESUME
// =========================================================

const updateResume = async (req, res) => {
  try {
    const resume =
      await Resume.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user,
        },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update resume",
      error: error.message,
    });
  }
};


// =========================================================
// DELETE RESUME
// =========================================================

const deleteResume = async (req, res) => {
  try {
    const resume =
      await Resume.findOneAndDelete({
        _id: req.params.id,
        userId: req.user,
      });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};


// =========================================================
// GENERATE RESUME PDF
// GET /api/resumes/:id/pdf
// =========================================================

const generateResumePDFController =
  async (req, res) => {
    try {
      const resume =
        await Resume.findOne({
          _id: req.params.id,
          userId: req.user,
        });

      if (!resume) {
        return res.status(404).json({
          message: "Resume not found",
        });
      }

      generateResumePDF(
        resume,
        res
      );

    } catch (error) {
      console.error(
        "PDF generation error:",
        error
      );

      // Important:
      // PDF response may already have started.
      if (!res.headersSent) {
        return res.status(500).json({
          message:
            "Failed to generate resume PDF",
          error: error.message,
        });
      }

      res.end();
    }
  };


// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  generateResumePDFController,
};