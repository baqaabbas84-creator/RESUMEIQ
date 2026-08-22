import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  uploadResumeFile,
  saveLatestResumeId,
} from "../services/resumeService";

function UploadResume() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const maxFileSize = 10 * 1024 * 1024;


  // =========================================================
  // VALIDATE FILE
  // =========================================================

  const validateFile = (file) => {
    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setError("Only PDF and DOCX files are allowed.");
      return;
    }

    if (file.size > maxFileSize) {
      setSelectedFile(null);
      setError("File size must be less than 10 MB.");
      return;
    }

    setSelectedFile(file);
  };


  // =========================================================
  // FILE SELECT
  // =========================================================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    validateFile(file);
  };


  // =========================================================
  // DRAG OVER
  // =========================================================

  const handleDragOver = (event) => {
    event.preventDefault();

    if (uploading) {
      return;
    }

    setDragActive(true);
  };


  // =========================================================
  // DRAG LEAVE
  // =========================================================

  const handleDragLeave = () => {
    setDragActive(false);
  };


  // =========================================================
  // DROP
  // =========================================================

  const handleDrop = (event) => {
    event.preventDefault();

    if (uploading) {
      return;
    }

    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    validateFile(file);
  };


  // =========================================================
  // REMOVE FILE
  // =========================================================

  const removeFile = () => {
    if (uploading) {
      return;
    }

    setSelectedFile(null);
    setError("");
    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  // =========================================================
  // UPLOAD + ANALYZE
  // =========================================================

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a resume first.");
      return;
    }

    setError("");
    setSuccess("");
    setUploading(true);

    try {
      console.log(
        "Uploading resume:",
        selectedFile.name
      );

      // Send file to backend
      const response = await uploadResumeFile(
        selectedFile
      );

      console.log(
        "Resume upload response:",
        response
      );


      // Get created resume ID
      const resumeId =
        response?.resume?._id;

      if (!resumeId) {
        throw new Error(
          "Resume ID was not returned by the server."
        );
      }


      // Save latest resume ID
      saveLatestResumeId(resumeId);


      console.log(
        "Latest Resume ID:",
        resumeId
      );


      // Success message
      setSuccess(
        "Resume uploaded and analyzed successfully!"
      );


      // Open Analysis page
      setTimeout(() => {
        navigate("/analysis");
      }, 800);

    } catch (err) {
      console.error(
        "Resume upload error:",
        err
      );

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Resume upload failed. Please try again."
      );

    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="upload-page">


      {/* =====================================================
          NAVBAR
          ===================================================== */}

      <nav className="upload-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>


        <div className="upload-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main className="upload-container">


        {/* ===================================================
            HEADER
            =================================================== */}

        <div className="upload-header">

          <span className="upload-badge">
            AI Resume Analyzer
          </span>

          <h1>
            Upload Your Resume
          </h1>

          <p>
            Upload your resume and get insights about
            your ATS score, skills, and career readiness.
          </p>

        </div>


        {/* ===================================================
            DROPZONE
            =================================================== */}

        {!selectedFile ? (

          <div
            className={`resume-dropzone ${
              dragActive
                ? "drag-active"
                : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() =>
              !uploading &&
              fileInputRef.current?.click()
            }
          >

            <div className="upload-cloud">
              ☁️
            </div>


            <h2>
              Drag & Drop your resume
            </h2>


            <p>
              or click here to browse your files
            </p>


            <span className="upload-supported">
              PDF or DOCX • Maximum 10 MB
            </span>


            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              hidden
            />


            <button
              type="button"
              className="browse-btn"
              disabled={uploading}
              onClick={(event) => {
                event.stopPropagation();

                fileInputRef.current?.click();
              }}
            >
              Choose Resume
            </button>

          </div>

        ) : (

          /* =================================================
             SELECTED FILE
             ================================================= */

          <div className="selected-file-card">

            <div className="file-icon">

              {selectedFile.type ===
              "application/pdf"
                ? "📕"
                : "📘"}

            </div>


            <div className="file-information">

              <h3>
                {selectedFile.name}
              </h3>


              <p>
                {(
                  selectedFile.size /
                  1024 /
                  1024
                ).toFixed(2)}{" "}
                MB
              </p>


              <span>
                ✓ File ready for analysis
              </span>

            </div>


            <button
              type="button"
              className="remove-file-btn"
              disabled={uploading}
              onClick={removeFile}
            >
              ×
            </button>

          </div>
        )}


        {/* ===================================================
            ERROR
            =================================================== */}

        {error && (

          <div className="upload-error">
            ⚠️ {error}
          </div>

        )}


        {/* ===================================================
            SUCCESS
            =================================================== */}

        {success && (

          <div className="upload-success">
            ✓ {success}
          </div>

        )}


        {/* ===================================================
            ACTION BUTTONS
            =================================================== */}

        {selectedFile && (

          <div className="upload-actions">


            {/* Analyze */}

            <button
              type="button"
              className="analyze-resume-btn"
              disabled={uploading}
              onClick={handleAnalyze}
            >

              {uploading
                ? "Analyzing Resume..."
                : "Analyze Resume"}


              {!uploading && (
                <span>
                  →
                </span>
              )}

            </button>


            {/* Choose Another */}

            <button
              type="button"
              className="change-file-btn"
              disabled={uploading}
              onClick={() => {

                removeFile();

                setTimeout(() => {
                  fileInputRef.current?.click();
                }, 0);

              }}
            >
              Choose Another File
            </button>

          </div>
        )}


        {/* ===================================================
            FEATURES
            =================================================== */}

        <section className="upload-features">


          {/* ATS SCORE */}

          <div className="upload-feature">

            <div>
              📊
            </div>

            <h3>
              ATS Score
            </h3>

            <p>
              Understand how your resume performs
              against ATS systems.
            </p>

          </div>


          {/* SKILL GAP */}

          <div className="upload-feature">

            <div>
              🎯
            </div>

            <h3>
              Skill Gap
            </h3>

            <p>
              Discover important skills missing
              from your resume.
            </p>

          </div>


          {/* AI RECOMMENDATIONS */}

          <div className="upload-feature">

            <div>
              💡
            </div>

            <h3>
              AI Recommendations
            </h3>

            <p>
              Get personalized suggestions to
              improve your resume.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default UploadResume;