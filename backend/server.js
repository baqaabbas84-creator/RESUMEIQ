const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

dotenv.config();

const app = express();


// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());

app.use(express.json());


// =========================================================
// DATABASE
// =========================================================

connectDB();


// =========================================================
// API ROUTES
// =========================================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/resumes",
  resumeRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/interviews",
  interviewRoutes
);


// =========================================================
// UPLOADED FILES
// =========================================================

app.use(
  "/uploads",
  express.static("uploads")
);


// =========================================================
// ROOT
// =========================================================

app.get("/", (req, res) => {
  res.json({
    message:
      "ResumeIQ Backend is running",
  });
});


// =========================================================
// SERVER
// =========================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});