const path = require("path");
const fs = require("fs");

const Resume = require("../models/Resume");

const {
  extractTextFromFile
} = require("../services/textExtractor");

const {
  parseResumeText
} = require("../services/resumeParser");

const {
  analyzeResume
} = require("../services/atsAnalyzer");


const uploadResume = async (req, res) => {
  try {

    // -------------------------
    // Check file
    // -------------------------

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF or DOCX file."
      });
    }


    // -------------------------
    // File path
    // -------------------------

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      req.file.filename
    );


    // -------------------------
    // Extract text
    // -------------------------

    const extractedText =
      await extractTextFromFile(
        filePath,
        req.file.mimetype
      );


    if (!extractedText.trim()) {

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(400).json({
        message:
          "Could not extract text from this resume. Please upload a text-based PDF or DOCX."
      });
    }


    // -------------------------
    // Parse resume
    // -------------------------

    const parsedResume =
      parseResumeText(extractedText);


    // -------------------------
    // ATS Analysis
    // -------------------------

    const atsResult =
      analyzeResume(parsedResume);


    // -------------------------
    // Create MongoDB Resume
    // -------------------------

    const resume =
      await Resume.create({

        userId: req.user,

        title:
          parsedResume.personalInfo.name
            ? `${parsedResume.personalInfo.name} Resume`
            : req.file.originalname,


        // Uploaded file
        file: {

          originalName:
            req.file.originalname,

          filename:
            req.file.filename,

          mimetype:
            req.file.mimetype,

          size:
            req.file.size,

          url:
            `/uploads/${req.file.filename}`
        },


        // Raw extracted text
        extractedText,


        // Parsed data
        personalInfo:
          parsedResume.personalInfo,

        summary:
          parsedResume.summary,

        education:
          parsedResume.education,

        experience:
          parsedResume.experience,

        skills:
          parsedResume.skills,

        projects:
          parsedResume.projects,

        certifications:
          parsedResume.certifications,


        // ATS
        atsScore:
          atsResult.score,

        atsAnalysis: {

          strengths:
            atsResult.strengths,

          weaknesses:
            atsResult.weaknesses,

          suggestions:
            atsResult.suggestions
        }
      });


    // -------------------------
    // Response
    // -------------------------

    res.status(201).json({

      message:
        "Resume uploaded, processed and analyzed successfully",

      resume

    });


  } catch (error) {

    console.error(
      "Resume processing error:",
      error
    );


    // Delete file if processing failed
    if (req.file) {

      const filePath =
        path.join(
          __dirname,
          "..",
          "uploads",
          req.file.filename
        );


      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }


    res.status(500).json({

      message:
        "Failed to process resume",

      error:
        error.message
    });

  }
};


module.exports = {
  uploadResume
};