const express = require("express");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume
} = require("../controllers/uploadController");

const router = express.Router();

router.post(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;