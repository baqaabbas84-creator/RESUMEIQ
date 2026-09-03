const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  generateResumePDFController,
} = require("../controllers/resumeController");

const router = express.Router();


// =========================================================
// ALL RESUME ROUTES ARE PROTECTED
// =========================================================

router.use(protect);


// =========================================================
// CREATE
// POST /api/resumes
// =========================================================

router.post(
  "/",
  createResume
);


// =========================================================
// GET ALL
// GET /api/resumes
// =========================================================

router.get(
  "/",
  getResumes
);


// =========================================================
// PDF
// GET /api/resumes/:id/pdf
// =========================================================

router.get(
  "/:id/pdf",
  generateResumePDFController
);


// =========================================================
// GET SINGLE
// GET /api/resumes/:id
// =========================================================

router.get(
  "/:id",
  getResumeById
);


// =========================================================
// UPDATE
// PUT /api/resumes/:id
// =========================================================

router.put(
  "/:id",
  updateResume
);


// =========================================================
// DELETE
// DELETE /api/resumes/:id
// =========================================================

router.delete(
  "/:id",
  deleteResume
);


module.exports = router;