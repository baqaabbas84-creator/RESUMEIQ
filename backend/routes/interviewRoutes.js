const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createInterview,
  getInterviews,
  getInterviewById,
  submitInterview,
  deleteInterview,
} = require("../controllers/interviewController");

const router = express.Router();

// All interview routes are protected
router.use(protect);

// Create new interview
router.post("/", createInterview);

// Get all interviews of logged-in user
router.get("/", getInterviews);

// Get single interview
router.get("/:id", getInterviewById);

// Submit interview
router.post("/:id/submit", submitInterview);

// Delete interview
router.delete("/:id", deleteInterview);

module.exports = router;